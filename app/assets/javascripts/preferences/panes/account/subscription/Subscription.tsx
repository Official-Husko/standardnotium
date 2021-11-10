import {
  PreferencesGroup,
  PreferencesSegment,
  Title,
} from '@/preferences/components';
import { WebApplication } from '@/ui_models/application';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { SubscriptionState } from './subscription_state';
import { SubscriptionInformation } from './SubscriptionInformation';
import { NoSubscription } from './NoSubscription';
import { Text } from '@/preferences/components';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'preact';
import { ApplicationEvent } from '@standardnotes/snjs';

type Props = {
  application: WebApplication;
  subscriptionState: SubscriptionState;
};

export const Subscription: FunctionComponent<Props> = observer(({
  application,
  subscriptionState,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userSubscription } = subscriptionState;

  const getSubscriptions = useCallback(async () => {
    try {
      const subscriptions = await application.getAvailableSubscriptions();
      if (subscriptions) {
        subscriptionState.setAvailableSubscriptions(subscriptions);
      }
    } catch (e) {
      // Error in this call will only prevent the plan name from showing
    }
  }, [application, subscriptionState]);

  const getSubscription = useCallback(async () => {
    try {
      const subscription = await application.getUserSubscription();
      if (subscription) {
        subscriptionState.setUserSubscription(subscription);
      }
    } catch (e) {
      setError(true);
    }
  }, [application, subscriptionState]);

  const getSubscriptionInfo = useCallback(async () => {
    setLoading(true);
    try {
      await getSubscription();
      await getSubscriptions();
    } finally {
      setLoading(false);
    }
  }, [getSubscription, getSubscriptions]);

  useEffect(() => {
    const removeUserRoleObserver = application.addEventObserver(
      async () => {
        await getSubscription();
        await getSubscriptions();
      },
      ApplicationEvent.UserRolesChanged
    );

    return () => {
      removeUserRoleObserver();
    };
  }, [application, getSubscription, getSubscriptions]);

  useEffect(() => {
    if (application.hasAccount()) {
      getSubscriptionInfo();
    }
  }, [application, getSubscriptionInfo]);

  const now = new Date().getTime();

  return (
    <PreferencesGroup>
      <PreferencesSegment>
        <div className="flex flex-row items-center">
          <div className="flex-grow flex flex-col">
            <Title>Subscription</Title>
            {error ? (
              <Text>No subscription information available.</Text>
            ) : loading ? (
              <Text>Loading subscription information...</Text>
            ) : userSubscription && userSubscription.endsAt > now ? (
              <SubscriptionInformation subscriptionState={subscriptionState} application={application} />
            ) : (
              <NoSubscription application={application} />
            )}
          </div>
        </div>
      </PreferencesSegment>
    </PreferencesGroup>
  );
});
