package com.stackroute.interestservice.listener;

import com.stackroute.interestservice.domain.CommonOutput;
import com.stackroute.interestservice.domain.Relationships;
import com.stackroute.interestservice.domain.Section;
import com.stackroute.interestservice.resource.IndexResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;


@Service
public class KafkaListen {
    @Autowired
    IndexResource indexResource;


    @KafkaListener(topics="${kafka.linsteningTopic}",groupId = "${kafka.groupId}",containerFactory = "${kafka.containerFactory}")
    public void consumeJson(@Payload Section exp)
    {
        System.out.println( exp);
        Relationships relationships=new Relationships("${kafka.relationshipProperty}","${kafka.relationshipType}");
        CommonOutput commonOutput=new CommonOutput("${kafka.operationType}","${kafka.sourceNode}","${kafka.sourceNodeProperties}",
                "${kafka.terminalNode}","${kafka.terminalNodeProperties}",relationships);
        indexResource.postDate(commonOutput);
    }
}