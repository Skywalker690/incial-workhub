# =========================
# Stage 1: Build
# =========================
FROM maven:3.9.6-amazoncorretto-17 AS build

WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests

# =========================
# Stage 2: Runtime
# =========================
FROM amazoncorretto:17-alpine

WORKDIR /app

# Copy jar without hardcoding version
COPY --from=build /app/target/*.jar app.jar

# Create non-root user
RUN addgroup -S incial && adduser -S incial -G incial
RUN chown -R incial:incial /app
USER incial

EXPOSE 8080

# Let JVM handle container memory correctly
ENTRYPOINT ["java", "-jar", "app.jar"]
