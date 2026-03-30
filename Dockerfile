# Stage 1: Build
FROM maven:3.8-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the backend folder
COPY quize/ /app/

# Build the jar
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Using a wildcard to catch the generated jar
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
