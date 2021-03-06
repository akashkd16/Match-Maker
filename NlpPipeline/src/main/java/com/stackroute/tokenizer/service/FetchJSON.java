package com.stackroute.tokenizer.service;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/*This class is for fetching data from redis*/

@Component
public class FetchJSON {

private final static  String url="http://172.23.239.135:8081/rest/neo4j/output";     // This hardcode is for testing

    public String  getAllData(){
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        return result;
    }
}
