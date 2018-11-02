// @flow
import axios from "axios";
import groupInfo from "./groups";

type VersionMeta = {
  major?: number,
  minor?: number,
  patch?: number
};

type LibraryStatus = "upToDate" | "major" | "minor" | "patch";

type Project = {
  name: string,
  url: string,
  lastActive: string
};

type Projects = {
  [string]: Project
};

type Library = {
  name: string,
  url: string,
  licence: string,
  version: string,
  versionMeta: VersionMeta,
  updatedAt: string,
  group: string
};

type Libraries = {
  [string]: Library
};

type ProjectLibraryRelation = {
  projectName: string,
  libraryName: string,
  licence: string,
  currentVersion: string,
  currentVersionMeta: VersionMeta,
  latestVersion?: string,
  latestVersionMeta?: VersionMeta,
  status: LibraryStatus
};

const getVersionMeta = (version: string): VersionMeta => {
  const match = version.match(/[0-9]+\.[0-9]+(\.[0-9]+)?/);
  if (!match) return {};

  const meta = match[0].split(".");
  return {
    major: Number(meta[0]),
    minor: Number(meta[1]),
    patch: Number(meta[2])
  };
};

const getVersionStatus = (
  latestVersionMeta: VersionMeta,
  currentVersionMeta: VersionMeta
): LibraryStatus => {
  let status = "upToDate";
  if (
    currentVersionMeta.patch !== undefined &&
    latestVersionMeta.patch !== undefined &&
    currentVersionMeta.patch < latestVersionMeta.patch
  ) {
    status = "patch";
  }
  if (
    currentVersionMeta.minor !== undefined &&
    latestVersionMeta.minor !== undefined &&
    currentVersionMeta.minor < latestVersionMeta.minor
  ) {
    status = "minor";
  }
  if (
    currentVersionMeta.major !== undefined &&
    latestVersionMeta.major !== undefined &&
    currentVersionMeta.major < latestVersionMeta.major
  ) {
    status = "major";
  }
  return status;
};

const getGroupInfo = (libraryName: string): string => {
  let group = "Etc";
  groupInfo.some(info => {
    const hasGroup = info.libs.includes(libraryName);
    if (hasGroup) {
      group = info.label;
    }
    return hasGroup;
  });
  return group;
};

const getLatestLibrariesBatch = async (
  usedLibraries: string[]
): Promise<Libraries | {}> => {
  try {
    const result = {};
    const maxChunkData = 250;
    for (let i = 0; i < usedLibraries.length; i += maxChunkData) {
      const chunkData = usedLibraries.slice(i, i + maxChunkData);
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

    const latestLibraries = {};

    usedLibraries.forEach(libraryName => {
      const latestLibraryInfo = result[libraryName];

      latestLibraries[libraryName] = {
        name: libraryName,
        url: "/",
        licence: "unknown",
        version: "unknown",
        versionMeta: {},
        updatedAt: "unknown",
        group: "Etc"
      };

      groupInfo.some(info => {
        const hasGroup = info.libs.includes(libraryName);
        if (hasGroup) {
          latestLibraries[libraryName].group = info.label;
        }
        return hasGroup;
      });

      if (!latestLibraryInfo) return;

      const {
        collected: { metadata: { version, date, license, links } }
      } = latestLibraryInfo;

      latestLibraries[libraryName].url = links.repository;
      latestLibraries[libraryName].version = version;
      latestLibraries[libraryName].versionMeta = getVersionMeta(version);
      latestLibraries[libraryName].updatedAt = date;
      latestLibraries[libraryName].licence = license;
    });

    return latestLibraries;
  } catch (error) {
    return getLatestLibraries(usedLibraries);
  }
};

const getLatestLibraries = async (
  usedLibraries: string[]
): Promise<Libraries | {}> => {
  const promises = usedLibraries.map(async libraryName => {
    try {
      return await axios
        .get(
          `http://cors-proxy.htmldriven.com/?url=https://registry.npmjs.org/${libraryName}`
        )
        .then(({ data }) => {
          const body = JSON.parse(data.body);
          const version = body["dist-tags"].latest;

          const latestLibrary = {
            name: body._id,
            url: body.repository.url,
            licence: body.license,
            version: version,
            versionMeta: getVersionMeta(version),
            updatedAt: body.time[version],
            group: getGroupInfo(body._id)
          };

          return latestLibrary;
        });
    } catch (error) {
      return null;
    }
  });

  const data = await Promise.all(promises);
  return data.reduce((acc, lib) => {
    if (!lib) return acc;
    acc[lib.name] = lib;
    return acc;
  }, {});
};

const createLibraryRelation = (
  projectLibraryRelation,
  projectName,
  dependencies = {},
  devDependencies = {}
) => {
  Object.keys(dependencies).forEach(libraryName => {
    const currentVersion = dependencies[libraryName];
    projectLibraryRelation.push({
      projectName,
      libraryName,
      currentVersion,
      currentVersionMeta: getVersionMeta(currentVersion),
      licence: "unknown",
      status: "upToDate"
    });
  });
  Object.keys(devDependencies).forEach(libraryName => {
    const currentVersion = devDependencies[libraryName];
    projectLibraryRelation.push({
      projectName,
      libraryName,
      currentVersion,
      currentVersionMeta: getVersionMeta(currentVersion),
      licence: "unknown",
      status: "upToDate"
    });
  });
};

const updateLibraryRelation = (projectLibraryRelation, latestLibraries) => {
  Object.keys(latestLibraries).forEach(libraryName => {
    const latestLibrary = latestLibraries[libraryName];
    projectLibraryRelation
      .filter(relation => relation.libraryName === libraryName)
      .forEach(relation => {
        relation.status = getVersionStatus(
          latestLibrary.versionMeta,
          relation.currentVersionMeta
        );
        relation.licence = latestLibrary.licence;
        relation.latestVersion = latestLibrary.version;
        relation.latestVersionMeta = latestLibrary.versionMeta;
      });
  });
};

const reformatData = async (
  data: any
): Promise<{
  projects: Projects,
  latestLibraries: Libraries,
  projectLibraryRelation: ProjectLibraryRelation[]
}> => {
  const { search } = data;
  if (!search)
    return { projects: {}, latestLibraries: {}, projectLibraryRelation: [] };

  const { nodes } = search;

  const projectLibraryRelation: ProjectLibraryRelation[] = [];

  const projects = nodes.reduce((acc, node) => {
    const projectName = node.name;
    const packageJSON = node.object ? JSON.parse(node.object.text) : {};
    const { dependencies, devDependencies } = packageJSON;

    createLibraryRelation(
      projectLibraryRelation,
      projectName,
      dependencies,
      devDependencies
    );

    acc[projectName] = {
      name: projectName,
      url: node.url,
      lastActive: node.pushedAt
    };

    return acc;
  }, {});

  const allUsedLibraryNames = Array.from(
    projectLibraryRelation.reduce((acc, relation) => {
      acc.add(relation.libraryName);
      return acc;
    }, new Set())
  );

  // const latestLibraries = await getLatestLibraries(allUsedLibraryNames);
  const latestLibraries = await getLatestLibrariesBatch(allUsedLibraryNames);

  updateLibraryRelation(projectLibraryRelation, latestLibraries);

  return {
    projects,
    latestLibraries,
    projectLibraryRelation
  };
};

export default reformatData;
