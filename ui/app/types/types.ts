export interface RecurrenceDetails {
  startTime: string;
  endTime: string;
  timeZone: string;
  recurrenceRange?: {
    scheduleStartDate: string;
    scheduleEndDate?: string;
  };
}

export interface ApiFilter {
  entityType?: string;
  entityId?: string;
  entityTags?: string[];
  managementZones?: string[];
}

export interface MaintenanceWindowRaw {
  objectId: string;
  scope?: string;
  schemaVersion?: string;
  created?: number;
  createdBy?: string;
  modified?: number;
  modifiedBy?: string;
  author?: string;
  updateToken?: string;
  summary?: string;
  value: {
    enabled: boolean;
    generalProperties: {
      name: string;
      description?: string;
      suppression: string;
      maintenanceType: string;
      disableSyntheticMonitorExecution?: boolean;
    };
    schedule: {
      scheduleType: string;
      onceRecurrence?: RecurrenceDetails;
      dailyRecurrence?: RecurrenceDetails;
      weeklyRecurrence?: RecurrenceDetails & { selectedWeekDays?: string[] };
      monthlyRecurrence?: RecurrenceDetails & { dayOfMonth?: number };
    };
    filters?: ApiFilter[];
  };
}

export interface MaintenanceWindow {
  objectId: string;
  maintenance: string;
  description: string;
  author: string;
  enabled: boolean;
  suppression: string;
  recurrence: string;
  start: string;
  end: string;
  timeZone: string;
  rawData: MaintenanceWindowRaw;
}

export interface ManagementZone {
  id: string;
  name: string;
}

export interface EntityReference {
  entityId: string;
  entityType: string;
  displayName: string;
}

export interface UnderlyingOptions {
  includeProcesses: boolean;
  includeServices: boolean;
  includeHosts: boolean;
  includeProcessGroups: boolean;
}

export interface EntityFilter {
  id: string;
  managementZones: ManagementZone[];
  tags: { key: string; value?: string }[];
  entities: EntityReference[];
  underlyingOptions: UnderlyingOptions;
}

export interface EntityTypeOption {
  value: string;
  label: string;
}

/**
 * A rule describing one DST transition (the moment DST starts or ends).
 * Expressed in local clock-time as "the Nth weekday of month X at hour H".
 *   - month:      1-12
 *   - week:       1-4 for "first/second/third/fourth", or -1 for "last"
 *   - dayOfWeek:  0=Sunday, 1=Monday, ..., 6=Saturday
 *   - hour:       hour of day the transition occurs (local time, 0-23)
 */
export interface DstTransition {
  month: number;
  week: number;
  dayOfWeek: number;
  hour: number;
}

export interface DstRule {
  start: DstTransition;  // when DST begins
  end: DstTransition;    // when DST ends
}

export interface TimezoneEntry {
  id: string;
  offset: string;        // standard-time offset (e.g. "−05:00")
  offsetDST?: string;    // DST offset, present only when DST is observed
  dstRule?: DstRule;     // rules for when DST starts/ends
  city: string;
  aliases?: string[];
  hidden?: boolean;
}

export interface AutoTagRule {
  type: string;
  enabled: boolean;
  entitySelector: string;
  valueFormat: string;
  valueNormalization: string;
}

export interface PreviewEntity {
  entityId: string;
  displayName: string;
  entityType: string;
}