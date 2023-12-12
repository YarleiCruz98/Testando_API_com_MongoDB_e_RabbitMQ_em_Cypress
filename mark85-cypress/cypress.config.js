const { defineConfig } = require("cypress");
const {connect} = require('./cypress/support/mongo')

require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const db = await connect()

      on('task', {
        async removeUser(email){
          const users = db.collection('users')
          await users.deleteMany({email: email})
          return null
        },
        async removeTask(taskName, emailUser){
          const users = db.collection('users')
          const user = users.findOne({email: emailUser})
          const tasks = db.collection('tasks')
          await tasks.deleteMany({name: taskName, user: user._id})
          return null
        },
        async removeTasksLike(key){
          const tasks = db.collection('tasks')
          await tasks.deleteMany({name: {$regex: key}})
          return null
        }
      })

      return config;
    },
    baseUrl:process.env.BASE_URL,
    video: false,
    screenshotOnRunFailure: false,
    env:{
    }
  },
});
