import { watch } from 'vue'
import googleAnalytics from '@/integrations/googleAnalytics'
import metaPixel from '@/integrations/metaPixel'
import snapPixel from '@/integrations/snapPixel'
import xPixel from '@/integrations/xPixel'
import googleTagManager from '@/integrations/googleTagManager'

export default defineNuxtPlugin(() => {
  const companyStore = useCompanyStore()

  const integrationsMap = {
    'google-analytics': googleAnalytics,
    'tag-manager': googleTagManager,
    'meta-pixel': metaPixel,
    'snap-pixel': snapPixel,
    'x-pixel': xPixel
  }

  function runIntegrations(companyData) {
    if (!companyData?.integration_apps?.length) return
    const apps = companyData.integration_apps
    apps.forEach(app => {
      const loader = integrationsMap[app.identifier]
      if (!loader) return
      loader.load(app.configs)
    })
  }
  runIntegrations(companyStore.company)
  watch(
    () => companyStore.company,
    (newCompany) => {
      runIntegrations(newCompany)
    }
  )
})
