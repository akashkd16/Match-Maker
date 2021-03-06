package com.stackroute.QueryService.controller;

import com.stackroute.QueryService.domain.QueryData;
import com.stackroute.QueryService.resource.QueryResource;
import com.stackroute.QueryService.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("${controller.base}")
public class QueryController {
    private QueryResource queryResource;
    private QueryService queryService;

    @Autowired
    public QueryController(QueryResource queryResource, QueryService queryService){
        this.queryResource = queryResource;
        this.queryService = queryService;
    }

    //Below methods does the mapping for other domain objects
    @PostMapping("${controller.search}")
    public ResponseEntity<QueryData> addQueryData(@RequestBody QueryData queryData)
    {
        ResponseEntity responseEntity = new ResponseEntity(queryData, HttpStatus.OK);
        queryService.addQueryData(queryData);
        queryResource.postQuery(queryData);
        return responseEntity;
    }
}


