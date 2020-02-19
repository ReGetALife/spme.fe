pipeline {
  agent any
  stages {
    stage('build') {
      agent {
        docker {
          image 'node:10-alpine'
        }

      }
      steps {
        sh '''echo $PWD
npm install
npm run build'''
      }
    }

  }
}