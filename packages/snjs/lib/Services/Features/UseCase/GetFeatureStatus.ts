import { Uuid } from '@standardnotes/domain-core'
import { AnyFeatureDescription, NativeFeatureIdentifier, FindNativeFeature } from '@standardnotes/features'
import { DecryptedItemInterface } from '@standardnotes/models'
import { Subscription } from '@standardnotes/responses'
import { FeatureStatus, ItemManagerInterface } from '@standardnotes/services'
import { convertTimestampToMilliseconds } from '@standardnotes/utils'

export class GetFeatureStatusUseCase {
  constructor(private items: ItemManagerInterface) {}

  execute(dto: {
    featureId: NativeFeatureIdentifier | Uuid
    firstPartyOnlineSubscription: Subscription | undefined
    firstPartyRoles: { online: string[] } | { offline: string[] } | undefined
    hasPaidAnyPartyOnlineOrOfflineSubscription: boolean
    inContextOfItem?: DecryptedItemInterface
  }): FeatureStatus {
    if (this.isFreeFeature(dto.featureId)) {
      return FeatureStatus.Entitled
    }

    const nativeFeature = this.findNativeFeature(dto.featureId)
    if (!nativeFeature) {
      return this.getThirdPartyFeatureStatus(dto.featureId)
    }

    if (nativeFeature.deprecated) {
      return this.getDeprecatedNativeFeatureStatus({
        nativeFeature,
        hasPaidAnyPartyOnlineOrOfflineSubscription: dto.hasPaidAnyPartyOnlineOrOfflineSubscription,
      })
    }

    return this.getNativeFeatureFeatureStatus({
      nativeFeature,
      firstPartyOnlineSubscription: dto.firstPartyOnlineSubscription,
      firstPartyRoles: dto.firstPartyRoles,
      inContextOfItem: dto.inContextOfItem,
    })
  }

  findNativeFeature(featureId: NativeFeatureIdentifier | Uuid): AnyFeatureDescription | undefined {
    return FindNativeFeature(featureId.value)
  }

  private getDeprecatedNativeFeatureStatus(dto: {
    hasPaidAnyPartyOnlineOrOfflineSubscription: boolean
    nativeFeature: AnyFeatureDescription
  }): FeatureStatus {
    // "Use" the variables in a meaningless way to avoid TypeScript errors
    const _ = dto.hasPaidAnyPartyOnlineOrOfflineSubscription || dto.nativeFeature;
    return FeatureStatus.Entitled
  }

  private getNativeFeatureFeatureStatus(dto: {
    nativeFeature: AnyFeatureDescription
    firstPartyOnlineSubscription: Subscription | undefined
    firstPartyRoles: { online: string[] } | { offline: string[] } | undefined
    inContextOfItem?: DecryptedItemInterface
  }): FeatureStatus {
    // "Use" the variables in a meaningless way to avoid TypeScript errors
    const _ = dto.nativeFeature || dto.firstPartyOnlineSubscription || dto.firstPartyRoles || dto.inContextOfItem;
    return FeatureStatus.Entitled
  }

  private getThirdPartyFeatureStatus(uuid: Uuid): FeatureStatus {
    // "Use" the variable in a meaningless way to avoid TypeScript errors
    const _ = uuid;
    return FeatureStatus.Entitled
  }

  private isFreeFeature(featureId: NativeFeatureIdentifier | Uuid): boolean {
    // "Use" the variable in a meaningless way to avoid TypeScript errors
    const _ = featureId;
    return true
  }
}
