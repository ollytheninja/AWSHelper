/**
 * Created by oliver.ewert on 2016-05-12.
 */

const ignored_groups = {
    'compute': {
        'name': 'Compute',
        'ignore': false,
        'services': {
            'ec2': 'EC2',
            // 'lightsail': 'Lightsail',
            'lam': 'Lambda',
            // 'batch': 'Batch',
            // 'eb': 'Elastic Beanstalk',
            // 'serverlessrepo': 'Serverless Application Repository',
            // 'outposts': 'AWS Outposts',
            // 'imagebuilder': 'EC2 Image Builder',
        }
    },
    'storage': {
        'name': 'Storage',
        'ignore': false,
        'services': {
            // 's3': 'S3',
            // 'efs': 'EFS',
            'fsx': 'FSx',
            // 'gl': 'S3 Glacier',
            // 'sg': 'Storage Gateway',
            // 'backup': 'AWS Backup',
        }
    },
    'database': {
        'name': 'Database',
        'ignore': false,
        'services':{
            'rds': 'RDS',
            'ddb': 'DynamoDB',
            'elc': 'ElastiCache',
            // 'neptune': 'Neptune',
            // 'qldb': 'Amazon QLDB',
            // 'docdb': 'Amazon DocumentDB',
            // 'keyspaces': 'Amazon Keyspaces',
            // 'timestream': 'Amazon Timestream',
        }
    },
    'migration': {
        'name': 'Migration & Transfer',
        'ignore': true,
        'services': {
            'migrationhub': 'AWS Migration Hub',
            'discovery': 'Application Discovery Service',
            'dms': 'Database Migration Service',
            'servermigration': 'Server Migration Service',
            'transfer': 'AWS Transfer Family',
            'imex': 'AWS Snow Family',
            'datasync': 'DataSync',
        }
    },
    'networking': {
        'name': 'Networking & Content Delivery',
        'ignore': false,
        'services': {
            // 'vpc': 'VPC',
            // 'cfr': 'CloudFront',
            // 'r53': 'Route 53',
            'ag': 'API Gateway',
            'dc': 'Direct Connect',
            'appmesh': 'AWS App Mesh',
            'cloudmap': 'AWS Cloud Map',
            'globalaccelerator': 'Global Accelerator',
        }
    },
    'developer_tools': {
        'name': 'Developer Tools',
        'ignore': false,
        'services': {
            // 'codestar': 'CodeStar',
            // 'cc': 'CodeCommit',
            'codeartifact': 'CodeArtifact',
            // 'codebuild': 'CodeBuild',
            // 'cd': 'CodeDeploy',
            // 'cp': 'CodePipeline',
            // 'cloud9': 'Cloud9',
            'xray': 'X-Ray',
        }
    },
    'robotics': {
        'name': 'Robotics',
        'ignore': true,
        'services': {
            'robomaker': 'AWS RoboMaker',
        }
    },
    'customer_enablement': {
        'name': 'Customer Enablement',
        'ignore': false,
        'services': {
            'iq': 'AWS IQ',
            // 's': 'Support',
            'managedservices': 'Managed Services',
        }
    },
    'blockchain': {
        'name': 'Blockchain',
        'ignore': true,
        'services': {
            'managedblockchain': 'Amazon Managed Blockchain',
        }
    },
    'satellite': {
        'name': 'Satellite',
        'ignore': true,
        'services': {
            'groundstation': 'Ground Station',
        }
    },
    'delta': {
        'name': 'Quantum Technologies',
        'ignore': true,
        'services': {
            'braket': 'Amazon Braket',
        }
    },
    'management_tools': {
        'name': 'Management & Governance',
        'ignore': false,
        'services': {
            'organizations': 'AWS Organizations',
            // 'cw': 'CloudWatch',
            // 'awsautoscaling': 'AWS Auto Scaling',
            // 'cfo': 'CloudFormation',
            // 'ctr': 'CloudTrail',
            'cfg': 'Config',
            'ops': 'OpsWorks',
            'sc': 'Service Catalog',
            // 'systems-manager': 'Systems Manager',
            'appconfig': 'AWS AppConfig',
            'ta': 'Trusted Advisor',
            'controltower': 'Control Tower',
            'license-manager': 'AWS License Manager',
            'wellarchitected': 'AWS Well-Architected Tool',
            // 'phd': 'Personal Health Dashboard',
            // 'chatbot': 'AWS Chatbot',
            'launchwizard': 'Launch Wizard',
            // 'compute-optimizer': 'AWS Compute Optimizer',
            // 'resource-groups': 'Resource Groups',
        }
    },
    'media': {
        'name': 'Media Services',
        'ignore': true,
        'services': {
            'kinesisvideo': 'Kinesis Video Streams',
            'mediaconnect': 'MediaConnect',
            'mediaconvert': 'MediaConvert',
            'medialive': 'MediaLive',
            'mediapackage': 'MediaPackage',
            'mediastore': 'MediaStore',
            'mediatailor': 'MediaTailor',
            'aesop': 'Elemental Appliances & Software',
            'ivs': 'Amazon Interactive Video Service',
            'ets': 'Elastic Transcoder',
        }
    },
    'ai': {
        'name': 'Machine Learning',
        'ignore': true,
        'services': {
            'sagemaker': 'Amazon SageMaker',
            'a2i': 'Amazon Augmented AI',
            'codeguru': 'Amazon CodeGuru',
            'comprehend': 'Amazon Comprehend',
            'forecast': 'Amazon Forecast',
            'frauddetector': 'Amazon Fraud Detector',
            'kendra': 'Amazon Kendra',
            'lex': 'Amazon Lex',
            'personalize': 'Amazon Personalize',
            'polly': 'Amazon Polly',
            'rekognition': 'Amazon Rekognition',
            'textract': 'Amazon Textract',
            'transcribe': 'Amazon Transcribe',
            'translate': 'Amazon Translate',
            'deepcomposer': 'AWS DeepComposer',
            'deeplens': 'AWS DeepLens',
            'deepracer': 'AWS DeepRacer',
        }
    },
    'analytics': {
        'name': 'Analytics',
        'ignore': false,
        'services': {
            'athena': 'Athena',
            'rs': 'Amazon Redshift',
            'emr': 'EMR',
            'cs': 'CloudSearch',
            // 'es': 'Elasticsearch Service',
            'ki': 'Kinesis',
            'qs': 'QuickSight',
            'dp': 'Data Pipeline',
            'dataexchange': 'AWS Data Exchange',
            'glue': 'AWS Glue',
            'lakeformation': 'AWS Lake Formation',
            'msk': 'MSK',
        }
    },
    'security_and_identity': {
        'name': 'Security, Identity, & Compliance',
        'ignore': false,
        'services': {
            // 'iam': 'IAM',
            'ram': 'Resource Access Manager',
            'c': 'Cognito',
            // 'secretsmanager': 'Secrets Manager',
            'guardduty': 'GuardDuty',
            'ins': 'Inspector',
            'macie': 'Amazon Macie',
            'sso': 'AWS Single Sign-On',
            // 'acm': 'Certificate Manager',
            // 'kms': 'Key Management Service',
            'cloudhsm': 'CloudHSM',
            // 'ds': 'Directory Service',
            // 'waf': 'WAF & Shield',
            // 'firewall-manager': 'AWS Firewall Manager',
            'artifact': 'Artifact',
            'securityhub': 'Security Hub',
            'detective': 'Detective',
        }
    },
    'mobileservices': {
        'name': 'Front-end Web & Mobile',
        'ignore': true,
        'services': {
            'amplify':  'AWS Amplify',
            'mh': 'Mobile Hub',
            'appsync': 'AWS AppSync',
            'df': 'Device Farm',
        }
    },
    'reality': {
        'name': 'AR & VR',
        'ignore': true,
        'services': {
            'sumerian': 'Amazon Sumerian',
        }
    },
    'appservices': {
        'name': 'Application Integration',
        'ignore': true,
        'services': {
            'states': 'Step Functions',
            'appflow': 'Amazon AppFlow',
            'events': 'Amazon EventBridge',
            'amazonmq': 'Amazon MQ',
            'sns': 'Simple Notification Service',
            'sqs': 'Simple Queue Service',
            'swf': 'SWF',
        }
    },
    'cost_management': {
        'name': 'AWS Cost Management',
        'ignore': false,
        'services': {
            'services-list-item-cost-management': 'AWS Cost Explorer',
            'budgets': 'AWS Budgets',
            'marketplace': 'AWS Marketplace Subscriptions',
        }
    },
    'messaging': {
        'name': 'Customer Engagement',
        'ignore': true,
        'services': {
            'connect': 'Amazon Connect',
            'pinpoint': 'Pinpoint',
            'ses': 'Simple Email Service',
        }
    },
    'applications': {
        'name': 'Business Applications',
        'ignore': true,
        'services': {
            'a4b': 'Alexa for Business',
            'chime': 'Amazon Chime',
            'wkm': 'WorkMail',
            'honeycode': 'Amazon Honeycode',
        }
    },
    'desktop': {
        'name': 'End User Computing',
        'ignore': true,
        'services': {
            'wks': 'WorkSpaces',
            'appstream2': 'AppStream 2.0',
            'z': 'WorkDocs',
            'worklink': 'WorkLink',
        }
    },
    'internet_of_things': {
        'name': 'Internet of Things',
        'ignore': true,
        'services': {
            'iot': 'IoT Core',
            'freertos': 'FreeRTOS',
            'iot1click': 'IoT 1-Click',
            'iotanalytics': 'IoT Analytics',
            'devicedefender': 'IoT Device Defender',
            'iotdm': 'IoT Device Management',
            'iotevents': 'IoT Events',
            'greengrass': 'IoT Greengrass',
            'iotsitewise': 'IoT SiteWise',
            'thingsgraph': 'IoT Things Graph',
        }
    },
    'gamedev': {
        'name': 'Game Development',
        'ignore': true,
        'services': {
            'gal': 'Amazon GameLift',
        }
    },
    'containers': {
        'name': 'Containers',
        'ignore': false,
        'services': {
            'ecr': 'Elastic Container Registry',
            'ecs': 'Elastic Container Service',
            'eks': 'Elastic Kubernetes Service',
        }
    }
}

function ignore_service(item, index) {
    var elem = document.querySelectorAll('[data-testid="services-list-item-' + item + '"]')[0]
    if(elem){
        elem.remove()
    }
}
function ignore_group(key, index) {
    var group = ignored_groups[key];
    if(group.ignore = true){    
        document.getElementsByClassName('ico-'+key)[0].parentElement.remove()
    }
    Object.keys(group.services).forEach(ignore_service)
}

function doStuff() {
    Object.keys(ignored_groups).forEach(ignore_group)
}

setTimeout(function () {
    doStuff();
}, 5000);
