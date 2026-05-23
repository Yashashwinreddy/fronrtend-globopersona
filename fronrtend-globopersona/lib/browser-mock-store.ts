'use client'

import { campaigns as seedCampaigns, contacts as seedContacts, type Campaign, type Contact } from '@/lib/mock-data'

const CAMPAIGNS_KEY = 'globopersona.mock.campaigns'
const CONTACTS_KEY = 'globopersona.mock.contacts'
const SETTINGS_KEY = 'globopersona.mock.settings'

export interface BrowserSettings {
  profile: {
    firstName: string
    lastName: string
    email: string
    timezone: string
  }
  company: {
    companyName: string
    address: string
    replyTo: string
  }
  notifications: {
    emailReports: boolean
    campaignAlerts: boolean
    weeklyDigest: boolean
    securityAlerts: boolean
  }
}

export const defaultBrowserSettings: BrowserSettings = {
  profile: {
    firstName: 'Yash',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    timezone: 'America/New_York (EST)',
  },
  company: {
    companyName: 'Globopersona',
    address: '123 Business Street\nNew York, NY 10001\nUnited States',
    replyTo: 'support@acme.com',
  },
  notifications: {
    emailReports: true,
    campaignAlerts: true,
    weeklyDigest: false,
    securityAlerts: true,
  },
}

function cloneCampaigns(items: Campaign[]): Campaign[] {
  return items.map((item) => ({ ...item }))
}

function cloneContacts(items: Contact[]): Contact[] {
  return items.map((item) => ({
    ...item,
    tags: [...item.tags],
  }))
}

function readStored<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeStored<T>(key: string, value: T) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function loadCampaigns(): Campaign[] {
  const stored = readStored<Campaign[]>(CAMPAIGNS_KEY)
  if (stored) return cloneCampaigns(stored)

  const seed = cloneCampaigns(seedCampaigns)
  writeStored(CAMPAIGNS_KEY, seed)
  return seed
}

export function saveCampaigns(items: Campaign[]) {
  writeStored(CAMPAIGNS_KEY, cloneCampaigns(items))
}

export function addCampaign(item: Campaign): Campaign[] {
  const current = loadCampaigns()
  const next = [item, ...current.filter((campaign) => campaign.id !== item.id)]
  saveCampaigns(next)
  return next
}

export function updateCampaign(id: string, updater: (campaign: Campaign) => Campaign): Campaign[] {
  const current = loadCampaigns()
  const next = current.map((campaign) => (campaign.id === id ? updater(campaign) : campaign))
  saveCampaigns(next)
  return next
}

export function removeCampaign(id: string): Campaign[] {
  const next = loadCampaigns().filter((campaign) => campaign.id !== id)
  saveCampaigns(next)
  return next
}

export function loadContacts(): Contact[] {
  const stored = readStored<Contact[]>(CONTACTS_KEY)
  if (stored) return cloneContacts(stored)

  const seed = cloneContacts(seedContacts)
  writeStored(CONTACTS_KEY, seed)
  return seed
}

export function saveContacts(items: Contact[]) {
  writeStored(CONTACTS_KEY, cloneContacts(items))
}

export function addContact(item: Contact): Contact[] {
  const current = loadContacts()
  const next = [item, ...current.filter((contact) => contact.id !== item.id)]
  saveContacts(next)
  return next
}

export function updateContact(id: string, updater: (contact: Contact) => Contact): Contact[] {
  const current = loadContacts()
  const next = current.map((contact) => (contact.id === id ? updater(contact) : contact))
  saveContacts(next)
  return next
}

export function removeContact(id: string): Contact[] {
  const next = loadContacts().filter((contact) => contact.id !== id)
  saveContacts(next)
  return next
}

export function loadBrowserSettings(): BrowserSettings {
  const stored = readStored<BrowserSettings>(SETTINGS_KEY)
  if (stored) return stored

  writeStored(SETTINGS_KEY, defaultBrowserSettings)
  return defaultBrowserSettings
}

export function saveBrowserSettings(settings: BrowserSettings) {
  writeStored(SETTINGS_KEY, settings)
}