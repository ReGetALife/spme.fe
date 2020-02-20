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
        sh '''node -v
npm -v
npm install
npm run build'''
      }
    }

    stage('deploy') {
      agent {
        docker {
          image 'node:10-alpine'
          args '-p 20201:9000'
        }

      }
      steps {
        sh 'npm start'
      }
    }

  }
}