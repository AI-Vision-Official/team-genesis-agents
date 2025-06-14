
export const mockIFTTTRules = [
  {
    id: '1',
    name: 'Social Media Alert to Slack',
    description: 'Send notification to Slack when mentioned on social media',
    enabled: true,
    createdBy: 'admin',
    createdAt: new Date(),
    lastTriggered: new Date(),
    triggerCount: 42,
    trigger: {
      id: 'trigger-1',
      type: 'social_media_mention' as const,
      platform: 'twitter',
      event: 'mention',
      parameters: { keywords: ['@ourcompany'] }
    },
    conditions: [],
    actions: [{
      id: 'action-1',
      type: 'send_slack_message' as const,
      platform: 'slack',
      operation: 'post_message',
      parameters: { channel: '#alerts' }
    }],
    priority: 'medium' as const,
    category: 'social_media' as const
  },
  {
    id: '2',
    name: 'Email to Task Creation',
    description: 'Create Asana task when important email received',
    enabled: true,
    createdBy: 'admin',
    createdAt: new Date(),
    lastTriggered: new Date(),
    triggerCount: 28,
    trigger: {
      id: 'trigger-2',
      type: 'email_received' as const,
      platform: 'gmail',
      event: 'new_email',
      parameters: { from: 'vip@company.com' }
    },
    conditions: [],
    actions: [{
      id: 'action-2',
      type: 'create_task' as const,
      platform: 'asana',
      operation: 'create_task',
      parameters: { project: 'Important Tasks' }
    }],
    priority: 'high' as const,
    category: 'productivity' as const
  }
];

export const mockIFTTTPlatforms = [
  // Social Media Platforms
  {
    id: '1',
    name: 'Slack',
    type: 'messaging' as const,
    icon: 'slack',
    connected: true,
    authRequired: true,
    availableTriggers: ['message_received', 'channel_created', 'user_joined'],
    availableActions: ['send_message', 'create_channel', 'set_status']
  },
  {
    id: '2',
    name: 'Twitter/X',
    type: 'social_media' as const,
    icon: 'twitter',
    connected: true,
    authRequired: true,
    availableTriggers: ['mention', 'new_follower', 'new_tweet', 'retweet'],
    availableActions: ['post_tweet', 'send_dm', 'follow_user', 'like_tweet']
  },
  {
    id: '3',
    name: 'Instagram',
    type: 'social_media' as const,
    icon: 'instagram',
    connected: false,
    authRequired: true,
    availableTriggers: ['new_post', 'mention', 'new_follower', 'story_posted'],
    availableActions: ['post_photo', 'post_story', 'send_message']
  },
  {
    id: '4',
    name: 'LinkedIn',
    type: 'social_media' as const,
    icon: 'linkedin',
    connected: false,
    authRequired: true,
    availableTriggers: ['new_connection', 'post_shared', 'message_received'],
    availableActions: ['post_update', 'send_message', 'connect_with_user']
  },
  {
    id: '5',
    name: 'Facebook',
    type: 'social_media' as const,
    icon: 'facebook',
    connected: false,
    authRequired: true,
    availableTriggers: ['new_post', 'page_mention', 'event_created'],
    availableActions: ['post_status', 'create_event', 'send_message']
  },
  {
    id: '6',
    name: 'TikTok',
    type: 'social_media' as const,
    icon: 'video',
    connected: false,
    authRequired: true,
    availableTriggers: ['new_video', 'comment_received', 'new_follower'],
    availableActions: ['post_video', 'reply_comment']
  },
  {
    id: '7',
    name: 'YouTube',
    type: 'social_media' as const,
    icon: 'youtube',
    connected: false,
    authRequired: true,
    availableTriggers: ['new_video', 'new_subscriber', 'comment_received'],
    availableActions: ['upload_video', 'reply_comment', 'create_playlist']
  },
  {
    id: '8',
    name: 'Discord',
    type: 'messaging' as const,
    icon: 'discord',
    connected: false,
    authRequired: true,
    availableTriggers: ['message_received', 'user_joined', 'voice_channel_joined'],
    availableActions: ['send_message', 'create_channel', 'assign_role']
  },
  {
    id: '9',
    name: 'Reddit',
    type: 'social_media' as const,
    icon: 'reddit',
    connected: false,
    authRequired: true,
    availableTriggers: ['new_post', 'comment_reply', 'mention'],
    availableActions: ['create_post', 'reply_comment', 'send_message']
  },
  
  // Email & Communication
  {
    id: '10',
    name: 'Gmail',
    type: 'email' as const,
    icon: 'mail',
    connected: true,
    authRequired: true,
    availableTriggers: ['email_received', 'email_starred', 'label_added'],
    availableActions: ['send_email', 'add_label', 'star_email', 'archive_email']
  },
  {
    id: '11',
    name: 'Outlook',
    type: 'email' as const,
    icon: 'mail',
    connected: false,
    authRequired: true,
    availableTriggers: ['email_received', 'event_created', 'task_assigned'],
    availableActions: ['send_email', 'create_event', 'create_task']
  },
  {
    id: '12',
    name: 'Zoom',
    type: 'messaging' as const,
    icon: 'video',
    connected: false,
    authRequired: true,
    availableTriggers: ['meeting_started', 'meeting_ended', 'participant_joined'],
    availableActions: ['schedule_meeting', 'send_invite', 'start_recording']
  },
  {
    id: '13',
    name: 'Microsoft Teams',
    type: 'messaging' as const,
    icon: 'users',
    connected: false,
    authRequired: true,
    availableTriggers: ['message_received', 'meeting_started', 'file_shared'],
    availableActions: ['send_message', 'schedule_meeting', 'share_file']
  },
  
  // Productivity & Project Management
  {
    id: '14',
    name: 'Asana',
    type: 'productivity' as const,
    icon: 'check-circle',
    connected: false,
    authRequired: true,
    availableTriggers: ['task_completed', 'task_assigned', 'project_created'],
    availableActions: ['create_task', 'update_task', 'assign_task', 'add_comment']
  },
  {
    id: '15',
    name: 'Trello',
    type: 'productivity' as const,
    icon: 'trello',
    connected: false,
    authRequired: true,
    availableTriggers: ['card_moved', 'card_created', 'due_date_approaching'],
    availableActions: ['create_card', 'move_card', 'add_comment', 'set_due_date']
  },
  {
    id: '16',
    name: 'Notion',
    type: 'productivity' as const,
    icon: 'file-text',
    connected: false,
    authRequired: true,
    availableTriggers: ['page_created', 'database_updated', 'comment_added'],
    availableActions: ['create_page', 'update_database', 'add_comment']
  },
  {
    id: '17',
    name: 'Monday.com',
    type: 'productivity' as const,
    icon: 'calendar',
    connected: false,
    authRequired: true,
    availableTriggers: ['item_created', 'status_changed', 'due_date_reached'],
    availableActions: ['create_item', 'update_status', 'add_update']
  },
  {
    id: '18',
    name: 'Jira',
    type: 'productivity' as const,
    icon: 'bug',
    connected: false,
    authRequired: true,
    availableTriggers: ['issue_created', 'status_changed', 'comment_added'],
    availableActions: ['create_issue', 'update_issue', 'add_comment', 'transition_issue']
  },
  {
    id: '19',
    name: 'GitHub',
    type: 'productivity' as const,
    icon: 'github',
    connected: false,
    authRequired: true,
    availableTriggers: ['push_event', 'pull_request', 'issue_opened', 'release_published'],
    availableActions: ['create_issue', 'add_comment', 'create_pull_request']
  },
  
  // Cloud Storage & File Management
  {
    id: '20',
    name: 'Google Drive',
    type: 'storage' as const,
    icon: 'hard-drive',
    connected: false,
    authRequired: true,
    availableTriggers: ['file_uploaded', 'file_shared', 'folder_created'],
    availableActions: ['upload_file', 'share_file', 'create_folder', 'move_file']
  },
  {
    id: '21',
    name: 'Dropbox',
    type: 'storage' as const,
    icon: 'cloud',
    connected: false,
    authRequired: true,
    availableTriggers: ['file_added', 'file_deleted', 'folder_shared'],
    availableActions: ['upload_file', 'share_folder', 'create_folder']
  },
  {
    id: '22',
    name: 'OneDrive',
    type: 'storage' as const,
    icon: 'cloud',
    connected: false,
    authRequired: true,
    availableTriggers: ['file_created', 'file_modified', 'file_shared'],
    availableActions: ['upload_file', 'share_file', 'sync_folder']
  },
  
  // Smart Home & IoT
  {
    id: '23',
    name: 'Philips Hue',
    type: 'system' as const,
    icon: 'lightbulb',
    connected: false,
    authRequired: true,
    availableTriggers: ['light_turned_on', 'scene_activated', 'motion_detected'],
    availableActions: ['turn_on_lights', 'change_color', 'set_brightness', 'activate_scene']
  },
  {
    id: '24',
    name: 'Nest',
    type: 'system' as const,
    icon: 'thermometer',
    connected: false,
    authRequired: true,
    availableTriggers: ['temperature_changed', 'motion_detected', 'door_opened'],
    availableActions: ['set_temperature', 'arm_security', 'send_alert']
  },
  {
    id: '25',
    name: 'Ring',
    type: 'system' as const,
    icon: 'bell',
    connected: false,
    authRequired: true,
    availableTriggers: ['doorbell_pressed', 'motion_detected', 'alarm_triggered'],
    availableActions: ['send_notification', 'start_recording', 'activate_alarm']
  },
  {
    id: '26',
    name: 'SmartThings',
    type: 'system' as const,
    icon: 'home',
    connected: false,
    authRequired: true,
    availableTriggers: ['device_activated', 'sensor_triggered', 'mode_changed'],
    availableActions: ['control_device', 'change_mode', 'send_notification']
  },
  
  // Finance & E-commerce
  {
    id: '27',
    name: 'Stripe',
    type: 'api' as const,
    icon: 'credit-card',
    connected: false,
    authRequired: true,
    availableTriggers: ['payment_received', 'subscription_created', 'invoice_paid'],
    availableActions: ['create_invoice', 'process_refund', 'send_receipt']
  },
  {
    id: '28',
    name: 'PayPal',
    type: 'api' as const,
    icon: 'dollar-sign',
    connected: false,
    authRequired: true,
    availableTriggers: ['payment_received', 'dispute_opened', 'subscription_cancelled'],
    availableActions: ['send_money', 'request_payment', 'create_invoice']
  },
  {
    id: '29',
    name: 'Shopify',
    type: 'api' as const,
    icon: 'shopping-cart',
    connected: false,
    authRequired: true,
    availableTriggers: ['order_created', 'product_updated', 'customer_registered'],
    availableActions: ['create_product', 'update_inventory', 'send_email', 'create_discount']
  },
  
  // Marketing & Analytics
  {
    id: '30',
    name: 'Mailchimp',
    type: 'api' as const,
    icon: 'mail',
    connected: false,
    authRequired: true,
    availableTriggers: ['subscriber_added', 'campaign_sent', 'email_opened'],
    availableActions: ['add_subscriber', 'send_campaign', 'create_segment']
  },
  {
    id: '31',
    name: 'Google Analytics',
    type: 'analytics' as const,
    icon: 'bar-chart',
    connected: false,
    authRequired: true,
    availableTriggers: ['goal_completed', 'traffic_spike', 'conversion_tracked'],
    availableActions: ['create_report', 'set_alert', 'track_event']
  },
  {
    id: '32',
    name: 'HubSpot',
    type: 'api' as const,
    icon: 'users',
    connected: false,
    authRequired: true,
    availableTriggers: ['contact_created', 'deal_closed', 'form_submitted'],
    availableActions: ['create_contact', 'update_deal', 'send_email', 'create_task']
  },
  
  // Weather & Location
  {
    id: '33',
    name: 'Weather Service',
    type: 'api' as const,
    icon: 'cloud-rain',
    connected: false,
    authRequired: false,
    availableTriggers: ['weather_change', 'temperature_threshold', 'severe_weather'],
    availableActions: ['get_forecast', 'send_alert', 'update_status']
  },
  {
    id: '34',
    name: 'Location Services',
    type: 'system' as const,
    icon: 'map-pin',
    connected: false,
    authRequired: true,
    availableTriggers: ['enter_location', 'leave_location', 'location_shared'],
    availableActions: ['log_location', 'send_notification', 'update_status']
  },
  
  // News & Information
  {
    id: '35',
    name: 'RSS Feeds',
    type: 'api' as const,
    icon: 'rss',
    connected: false,
    authRequired: false,
    availableTriggers: ['new_article', 'keyword_mentioned', 'feed_updated'],
    availableActions: ['share_article', 'send_summary', 'save_bookmark']
  },
  {
    id: '36',
    name: 'News API',
    type: 'api' as const,
    icon: 'newspaper',
    connected: false,
    authRequired: true,
    availableTriggers: ['breaking_news', 'trending_topic', 'source_published'],
    availableActions: ['fetch_articles', 'send_digest', 'create_alert']
  }
];

export const mockIFTTTLogs = [
  {
    id: '1',
    ruleId: '1',
    ruleName: 'Social Media Alert to Slack',
    timestamp: new Date(),
    status: 'success' as const,
    triggerData: { mention: '@ourcompany in new tweet' },
    executedActions: ['send_slack_message'],
    executionTime: 245
  },
  {
    id: '2',
    ruleId: '2',
    ruleName: 'Email to Task Creation',
    timestamp: new Date(Date.now() - 3600000),
    status: 'success' as const,
    triggerData: { from: 'vip@company.com', subject: 'Urgent: New Project Requirements' },
    executedActions: ['create_task'],
    executionTime: 180
  },
  {
    id: '3',
    ruleId: '1',
    ruleName: 'Social Media Alert to Slack',
    timestamp: new Date(Date.now() - 7200000),
    status: 'failed' as const,
    triggerData: { mention: '@ourcompany mentioned' },
    executedActions: [],
    errorMessage: 'Slack API rate limit exceeded',
    executionTime: 0
  }
];

export const mockIFTTTStats = {
  totalRules: 12,
  activeRules: 8,
  totalExecutions: 234,
  successRate: 91.5,
  topCategories: [
    { category: 'social_media', count: 4 },
    { category: 'productivity', count: 3 },
    { category: 'system', count: 2 },
    { category: 'api', count: 2 },
    { category: 'marketing', count: 1 }
  ],
  recentExecutions: mockIFTTTLogs,
  performanceMetrics: {
    averageExecutionTime: 198,
    totalDataProcessed: 2048,
    apiCallsMade: 156
  }
};
