pipeline {
    agent any

    environment {
        APP_NAME = 'sit223-express-app'
        IMAGE_NAME = 'sit223-express-app'
        CONTAINER_NAME = 'sit223-express-container'
        VERSION = "1.0.${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the Express project from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies and building Docker image...'
                bat 'npm install'
                bat 'docker build -t %IMAGE_NAME%:%VERSION% .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated Express test suite...'
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running SonarCloud code quality analysis...'
                bat 'sonar-scanner'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm dependency security audit...'
                bat 'npm audit --audit-level=high'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Express app to Docker test environment...'
                bat 'docker stop %CONTAINER_NAME% || exit 0'
                bat 'docker rm %CONTAINER_NAME% || exit 0'
                bat 'docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%:%VERSION%'
            }
        }

        stage('Release') {
            steps {
                echo 'Creating versioned release tag...'
                bat 'git tag v%VERSION% || exit 0'
                echo 'Release version created.'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking deployed application health endpoint...'
                bat 'curl http://localhost:3000/health'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the failed Jenkins stage logs.'
        }
    }
}