FROM openjdk:10

ADD ./target/IndexerService-1.0.jar /usr/src/IndexerService-1.0.jar
HEALTHCHECK --interval=30s --timeout=30s CMD curl -f http://localhost:8001/actuator/health || exit 1
EXPOSE 8001
WORKDIR usr/src
ENTRYPOINT ["java","-jar","IndexerService-1.0.jar"]
