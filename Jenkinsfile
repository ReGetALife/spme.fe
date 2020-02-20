pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh '''npm install
npm run build'''
        archiveArtifacts(artifacts: 'dist/**', allowEmptyArchive: true, onlyIfSuccessful: true)
      }
    }

  }
}