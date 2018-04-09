// @flow
import axios from "axios";
import groupInfo from "./groups";

const usedLibraryList = {};
const repositoryInfo = {};

const getVersionMeta = (version: string) => {
  const match = version.match(/[0-9]+\.[0-9]+(\.[0-9]+)?/);
  if (!match) return {};
  const meta = match[0].split(".");
  return {
    major: meta[0],
    minor: meta[1],
    patch: meta[2]
  };
};

const parsePackageJSON = nodeObject => {
  if (!nodeObject) return null;

  return JSON.parse(nodeObject.text);
};

const createUsedLibraryList = (repoName, packageJSON) => {
  if (!packageJSON) return null;

  const { dependencies = {}, devDependencies = {} } = packageJSON;

  const libraries = Object.keys(dependencies).concat(
    Object.keys(devDependencies)
  );
  if (!libraries.length) return null;

  libraries.forEach(lib => {
    usedLibraryList[lib] = { version: "unknown", versionMeta: {} };
  });

  groupInfo.forEach(info => {
    info.libs.forEach(lib => {
      usedLibraryList[lib] = { version: "unknown", versionMeta: {} };
    });
  });

  repositoryInfo[repoName] = {
    ...dependencies,
    ...devDependencies
  };
};

const getLibraryLatestVersion = async () => {
  const usedLibraryNames = Object.keys(usedLibraryList);

  const result = {};
  const maxChunkData = 250;
  for (let i = 0; i < usedLibraryNames.length; i += maxChunkData) {
    const chunkData = usedLibraryNames.slice(i, i + maxChunkData);
    const response = await axios.post(
      "https://api.npms.io/v2/package/mget",
      chunkData,
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );
    Object.assign(result, response.data);
  }

  usedLibraryNames.forEach(name => {
    const latestLibraryInfo = result[name];
    const version = latestLibraryInfo
      ? latestLibraryInfo.collected.metadata.version
      : "unknow";
    const versionMeta = getVersionMeta(version);

    usedLibraryList[name] = {
      version,
      versionMeta
    };
  });
};

const makeGroupList = () => {
  return groupInfo.reduce(
    (acc, value) => {
      value.libs.forEach((lib, index) => {
        if (index === 0) {
          acc.push(value.label);
        } else {
          acc.push(undefined);
        }
      });
      return acc;
    },
    ["Groups"]
  );
};

const makeLibraryList = () => {
  const addedLibs = {};
  const libs = [{ name: "Libraries", version: "latest" }];

  groupInfo.forEach(group => {
    group.libs.forEach(libName => {
      const version = usedLibraryList[libName].version || "-";
      addedLibs[libName] = true;
      libs.push({ name: libName, version });
    });
  });
  const libNames = Object.keys(usedLibraryList);
  const etcLibs = libNames
    .filter(libName => !addedLibs[libName])
    .map(libName => ({
      name: libName,
      version: usedLibraryList[libName].version || "-"
    }));
  return libs.concat(etcLibs);
};

const makeRepoList = libs => {
  const repoNames = Object.keys(repositoryInfo);
  const r = repoNames.map(repoName => {
    return libs.reduce(
      (acc, lib, index) => {
        if (index === 0) {
          return acc;
        }
        const version = repositoryInfo[repoName][lib.name] || "-";
        const versionMeta = getVersionMeta(version);
        let status = version === "-" ? "notUsed" : "ok";
        if (versionMeta.patch < usedLibraryList[lib.name].versionMeta.patch) {
          status = "patch";
        }
        if (versionMeta.minor < usedLibraryList[lib.name].versionMeta.minor) {
          status = "minor";
        }
        if (versionMeta.major < usedLibraryList[lib.name].versionMeta.major) {
          status = "major";
        }

        return acc.concat({
          version,
          status
        });
      },
      [repoName]
    );
  });
  return r;
};

const refineData = async (data: any) => {
  const { search } = data;
  if (!search) return {};

  const { nodes } = search;

  for (const node of nodes) {
    const packageJSON = parsePackageJSON(node.object);
    createUsedLibraryList(node.name, packageJSON);
  }
  await getLibraryLatestVersion();

  const groups = makeGroupList();
  const libs = makeLibraryList();
  const repos = makeRepoList(libs);

  const refined = {
    groups,
    libs,
    repos
  };

  // console.log("refined", refined);
  return refined;
};

export default refineData;
