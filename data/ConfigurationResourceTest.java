package com.cmss.rds.resource;

import com.cmss.rds.utils.Config;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wangyao on 2016/12/13.
 */
public class ConfigurationResourceTest extends TestBase{
    String config1 = Config.getConfigId1();
    String config2 = Config.getConfigId2();
    String instanceId = Config.getInstanceId();

    @Test
    public void testGetConfigurationService() throws Exception {

    }

    @Test
    public void testSetConfigurationService() throws Exception {

    }

    @Test
    public void testGetConfigList() throws Exception {
        Response result = target("mysql/configurations").request().get();
        System.out.println(result);
    }

    @Test
    public void testGetConfigListByVersion() throws Exception {
        Response result = target("mysql/configurations/5.6/listByVersion").request().get();
        System.out.println(result);
    }

    @Test
    public void testCreateConfig() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("label_mingcheng", "TestConfig");
        map.put("rds_DBtype", "mysql");//cluster
        map.put("rds_DBversion", "5.6");//cluster dbstaore
        map.put("label_des", "TestConfig");
        Response result = target("mysql/configurations").request()
                .post(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testGetConfigDetail() throws Exception {
        Response result = target("mysql/configurations/"+config1).request().get();
        System.out.println(result);
    }

    @Test
    public void testGetConfigDetailSelf() throws Exception {
        Response result = target("mysql/configurations/"+config1+"/selfDetail").request().get();
        System.out.println(result);
    }

    @Test
    public void testEditConfig() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("configJson", "");
        Response result = target("mysql/configurations/"+config1).request().
                put(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testAttachConfig() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("configID", config1);
        Response result = target("mysql/configurations/"+instanceId+"/attach").request().
                put(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testDetachConfig() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        Response result = target("mysql/configurations/"+instanceId+"/detach").request().
                put(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testCompareConfig() throws Exception {
        Response result = target("mysql/configurations/"+config1+"/"+config2+"/compare").request().
                get();
        System.out.println(result);
    }

    @Test
    public void testDelConfig() throws Exception {
        Response result = target("mysql/configurations/"+config1).request().delete();
        System.out.println(result);
    }

}