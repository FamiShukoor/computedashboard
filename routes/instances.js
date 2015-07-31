var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/awsconfig.json');
var ec2 = new AWS.EC2();
var data = [];
// returns all running ec2 instances and its details
ec2.describeInstances(function(err, result) {
    if (err)
        console.log(err);
    var inst_id = '-';
    for (var i = 0; i < result.Reservations.length; i++) {
        var res = result.Reservations[i];
        var instances = res.Instances;
        for (var j = 0; j < instances.length; j++) {
            var instanceID = instances[j].InstanceId;
            var instanceType = instances[j].InstanceType;
            var stateCode = instances[j].State.Code;
            var stateName = instances[j].State.Name;
            var publicIP = instances[j].PublicIpAddress;
            var privateIP = instances[j].PrivateIpAddress;
            var imageID = instances[j].ImageId;
            var az = instances[j].Placement.AvailabilityZone;
            //console.log('instanceID ' + instanceID + " state " + stateName + " public ip " + publicIP + 'private ip' + privateIP + 'image id ' + imageID+ 'Availability zone'+az);
            var obj = {instanceID: instanceID,instanceType: instanceType,state: stateName,publicIP: publicIP,privateIP: privateIP,imageID: imageID,availabilityZone:az};
            data.push(obj);
        }
    }
});
var instancelist = {
    getAll: function(req, res) {
        var allInstances = data;
        res.json(allInstances);
    }
};
module.exports = instancelist;