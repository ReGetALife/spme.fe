pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 20201:3000'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

  }
}