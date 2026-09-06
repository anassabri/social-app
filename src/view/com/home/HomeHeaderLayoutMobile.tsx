import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {useNavigation} from '@react-navigation/native'

import {HITSLOP_10} from '#/lib/constants'
import {PressableScale} from '#/lib/custom-animations/PressableScale'
import {useHaptics} from '#/lib/haptics'
import {isWeb} from '#/platform/detection'
import {type NavigationProp} from '#/lib/routes/types'
import {emitSoftReset} from '#/state/events'
import {useSession} from '#/state/session'
import {useShellLayout} from '#/state/shell/shell-layout'
import {useHomeHeaderTransform} from '#/view/com/util/MainScrollProvider'
import {Logo} from '#/view/icons/Logo'
import {useLogoVariant} from '#/view/icons/useLogoVariant'
import {atoms as a, useTheme} from '#/alf'
import {Button, ButtonIcon} from '#/components/Button'
import {Hashtag_Stroke2_Corner0_Rounded as FeedsIcon} from '#/components/icons/Hashtag'
import {HomeOpen_Stoke2_Corner0_Rounded as HomeIcon} from '#/components/icons/HomeOpen'
import * as Layout from '#/components/Layout'
import {Link} from '#/components/Link'
import {useAnalytics} from '#/analytics'
import {IS_DEV, IS_LIQUID_GLASS} from '#/env'

/**
 * Gets the parent domain URL by removing the "x." prefix from the current hostname.
 */
function getParentDomainUrl(): string {
  if (typeof window === 'undefined') return '/'
  const hostname = window.location.hostname
  if (hostname.startsWith('x.')) {
    const parentDomain = hostname.replace(/^x\./, '')
    return `${window.location.protocol}//${parentDomain}`
  }
  return window.location.origin
}

/**
 * Home button for mobile header that links to parent domain.
 * Only renders on web.
 */
function MobileParentDomainHomeButton() {
  const {_} = useLingui()

  if (!isWeb) return null

  const parentUrl = getParentDomainUrl()

  return (
    <Button
      label={_(msg`Go to main site`)}
      size="small"
      variant="ghost"
      color="secondary"
      shape="square"
      onPress={() => {
        window.open(parentUrl, '_self')
      }}
      style={[
        a.justify_center,
        {marginLeft: -Layout.BUTTON_VISUAL_ALIGNMENT_OFFSET},
        a.bg_transparent,
      ]}>
      <ButtonIcon icon={HomeIcon} size="lg" />
    </Button>
  )
}

export function HomeHeaderLayoutMobile({
  children,
}: {
  children: React.ReactNode
  tabBarAnchor: React.ReactElement | null | undefined
}) {
  const t = useTheme()
  const {_} = useLingui()
  const ax = useAnalytics()
  const {headerHeight} = useShellLayout()
  const insets = useSafeAreaInsets()
  const headerMinimalShellTransform = useHomeHeaderTransform()
  const {hasSession} = useSession()
  const playHaptic = useHaptics()
  const {navigate} = useNavigation<NavigationProp>()
  const logoVariant = useLogoVariant()

  return (
    <Animated.View
      style={[
        a.fixed,
        a.z_10,
        t.atoms.bg,
        {
          top: 0,
          left: 0,
          right: 0,
        },
        IS_LIQUID_GLASS && {paddingTop: insets.top},
        headerMinimalShellTransform,
      ]}
      onLayout={e => {
        headerHeight.set(e.nativeEvent.layout.height)
      }}>
      <Layout.Header.Outer noBottomBorder>
        <Layout.Header.Slot>
          <MobileParentDomainHomeButton />
        </Layout.Header.Slot>

        <View style={[a.flex_1, a.align_center]}>
          <PressableScale
            targetScale={0.9}
            onPress={() => {
              if (IS_DEV) {
                navigate('Debug')
              } else {
                playHaptic('Light')
                emitSoftReset()
              }
            }}>
            <Logo width={logoVariant === 'japan' ? 34 : 30} />
          </PressableScale>
        </View>

        <Layout.Header.Slot>
          {hasSession && (
            <Link
              testID="viewHeaderHomeFeedPrefsBtn"
              to={{screen: 'Feeds'}}
              hitSlop={HITSLOP_10}
              label={_(msg`View your feeds and explore more`)}
              size="small"
              variant="ghost"
              color="secondary"
              shape="square"
              onPress={() => {
                ax.metric('nav:click', {item: 'feeds', surface: 'topBar'})
              }}
              style={[
                a.justify_center,
                {marginRight: -Layout.BUTTON_VISUAL_ALIGNMENT_OFFSET},
                a.bg_transparent,
              ]}>
              <ButtonIcon icon={FeedsIcon} size="lg" />
            </Link>
          )}
        </Layout.Header.Slot>
      </Layout.Header.Outer>
      {children}
    </Animated.View>
  )
}
