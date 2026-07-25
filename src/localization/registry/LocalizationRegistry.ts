import LocalizationController from '../controllers/LocalizationController'
import LocalizationService from '../services/LocalizationService'

class LocalizationRegistry {
  private readonly controller: LocalizationController

  private readonly service: LocalizationService

  constructor(
    controller: LocalizationController =
      new LocalizationController('fr'),
    service: LocalizationService =
      new LocalizationService(),
  ) {
    this.controller = controller
    this.service = service
  }

  getController(): LocalizationController {
    return this.controller
  }

  getService(): LocalizationService {
    return this.service
  }
}

export const localizationRegistry =
  new LocalizationRegistry()

export { LocalizationRegistry }
