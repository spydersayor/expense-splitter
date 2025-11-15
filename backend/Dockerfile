# Backend Dockerfile
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY mvnw .
COPY pom.xml .
COPY .mvn .mvn
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src ./src
RUN ./mvnw package -DskipTests

# Expose port
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
