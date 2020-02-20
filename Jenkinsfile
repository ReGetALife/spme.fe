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
        sh '''npm install
npm run build'''
        archiveArtifacts(artifacts: 'dist/**', allowEmptyArchive: true, onlyIfSuccessful: true)
      }
    }

  }
}