import { outputFile } from 'fs-extra'

export const saveJson = (name: string, data: string) => outputFile(`${process.cwd()}/migrations/${name}.json`, data)

export const saveContractAddress = (name: string, address: string) =>
  outputFile(`${process.cwd()}/deployments/${name}.ts`, `export default "${address}";`)
