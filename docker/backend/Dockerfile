FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY ../../book-network/pom.xml .
RUN mvn dependency:go-offline
COPY ../../book-network/src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21
ARG PROFILE=dev
ARG APP_VERSION=1.0.3

WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD ["sh", "-c", "java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${JAR_VERSION}.jar"]
