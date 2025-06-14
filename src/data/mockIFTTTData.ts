
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
  }
];

export const mockIFTTTPlatforms = [
  {
    id: '1',
    name: 'Slack',
    type: 'messaging' as const,
    icon: 'slack',
    connected: true,
    authRequired: true,
    availableTriggers: ['message_received'],
    availableActions: ['send_message']
  },
  {
    id: '2',
    name: 'Twitter/X',
    type: 'social_media' as const,
    icon: 'twitter',
    connected: true,
    authRequired: true,
    availableTriggers: ['mention', 'new_follower'],
    availableActions: ['post_tweet']
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
  }
];

export const mockIFTTTStats = {
  totalRules: 8,
  activeRules: 6,
  totalExecutions: 156,
  successRate: 94.2,
  topCategories: [
    { category: 'social_media', count: 3 },
    { category: 'productivity', count: 2 }
  ],
  recentExecutions: mockIFTTTLogs,
  performanceMetrics: {
    averageExecutionTime: 245,
    totalDataProcessed: 1024,
    apiCallsMade: 89
  }
};
