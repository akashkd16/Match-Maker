package com.stackroute.springlocation.service;

import com.stackroute.springlocation.domain.CommonOutput;
import com.stackroute.springlocation.domain.Section;

public interface LocationService {
    CommonOutput processLocationDetails(Section section);
}
