import { DateTime, SemverOutdateStatus } from "../../generated/types";
export namespace NodeProjectsTable_projectsFragmentData {
  export interface NpmPackageDependenciesPackage {
    __typename: "NPMPackage";
    id: string;
    name: string;
    version?: string | null;
    license?: string | null;
    updatedAt?: string | null;
  }
  export interface NpmPackageDependencies {
    __typename: "NPMDependency";
    id: string;
    name: string;
    outdateStatus?: SemverOutdateStatus | null;
    package: NodeProjectsTable_projectsFragmentData.NpmPackageDependenciesPackage;
  }
  export interface NpmPackage {
    __typename: "NPMPackage";
    id: string;
    dependencies: (NodeProjectsTable_projectsFragmentData.NpmPackageDependencies | null)[];
  }
}
export interface NodeProjectsTable_projectsFragmentData {
  __typename: "Repository";
  id: string;
  name: string;
  pushedAt?: DateTime | null;
  npmPackage?: NodeProjectsTable_projectsFragmentData.NpmPackage | null;
}