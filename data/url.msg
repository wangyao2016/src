package com.cmss.rds.resource;

import com.cmss.rds.utils.Config;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wangyao on 2017/7/5.
 */
public class ClusterResourceTest extends TestBase{
    String clusterId = Config.getClusterId();
    String instanceId = Config.getInstanceId();
    String configId = Config.getConfigId1();
    @Test
    public void testGetClustersList() throws Exception {
        Response result = target("rds/v1/mysql/clusters").request().get();
        System.out.println(result);
    }

    @Test
    public void testGetClusterDetail() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId).request().get();
        System.out.println(result);
    }

    @Test
    public void testGetClusterInstanceDetail() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/instances/"+instanceId).request().get();
        System.out.println(result);
    }

    @Test
    public void testGetClusterActiveInstanceId() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/active").request().get();
        System.out.println(result);
    }

    @Test
    public void testRestartCluster() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("action", "restart");
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/action").request().post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testResetClusterStatus() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("action", "reset_status");
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/action").request().post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testResizeFlavor() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("action", "resize_flavor");
        map.put("flavorRef", "311");
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/action").request().post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testResetSizeVolume() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("action", "resize_volume");
        map.put("size", "2");
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/action").request().post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testConfigurationAttach() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("action", "configuration_attach");
        map.put("configuration_id", configId);
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/action").request().post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testConfigurationDetach() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("action", "configuration_detach");
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/action").request().post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testGetClusterUsers() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users").request().get();
        System.out.println(result);
    }

    @Test
    public void testCreateClusterUser() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("name", "TestClusterUser");
        map.put("password", "123456");
        map.put("host", "127.0.0.1");
        String result = target("rds/v1/mysql/clusters/"+clusterId+"/users").request()
                .post(Entity.json(map),String.class);
        System.out.println(result);
    }

    @Test
    public void testGetDBByUser() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser").request().get();
        System.out.println(result);
    }

    @Test
    public void testDelUser() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser").request().delete();
        System.out.println(result);
    }


    @Test
    public void testGetUserRules() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser/index_by_name").
                request().get();
        System.out.println(result);
    }

    @Test
    public void testGetUgrantDBByUser() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser/databases").
                request().get();
        System.out.println(result);
    }

    @Test
    public void testCreateDB() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("name", "TestDb");
        map.put("character_set", "utf8");
        map.put("collate", "utf8_general_ci");
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/databases").request()
                .post(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testGrantDBToUser() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("activeDB", "TestDb");
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser/databases").request().
                put(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testRevokeDBToUser() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser/databases").request().
                delete();
        System.out.println(result);
    }

    @Test
    public void testChangeUserPassword() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("password", "111111");
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser/password").request().
                put(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testChangeUserIP() throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("ip", "127.0.0.1");
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser/ip").request().
                put(Entity.entity(map, MediaType.APPLICATION_JSON));
        System.out.println(result);
    }

    @Test
    public void testGetDBs() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/databases").
                request().get();
        System.out.println(result);
    }

    @Test
    public void testGetClusterBackups() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/backups").
                request().get();
        System.out.println(result);
    }

    @Test
    public void testGetInstanceBackupsByName() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/backups/TestCluster").
                request().get();
        System.out.println(result);
    }

    @Test
    public void testGetDistinctUsers() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/usersDistinct").
                request().get();
        System.out.println(result);
    }

    @Test
    public void testDelCluster() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId).request().delete();
        System.out.println(result);
    }

    @Test
    public void testDelDB() throws Exception {
        Response result = target("rds/v1/mysql/clusters/"+clusterId+"/databases/TestDb").
                request().delete();
        System.out.println(result);
    }
}
