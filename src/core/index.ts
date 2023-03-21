import commandCreate from './create'
export * from './help'

const commands = {
  'create <project-name>': {
    description: 'create a project',
    option: [
      {
        cmd: '-f, --force',
        msg: 'overwrite target dir if it exist'
      }
    ],
    action: commandCreate
  }
}

export default commands;