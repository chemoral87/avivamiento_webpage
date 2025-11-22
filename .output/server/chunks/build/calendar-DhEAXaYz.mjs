import { ref, withCtx, createTextVNode, createVNode, toRef, computed, watch, withDirectives, mergeProps, createElementVNode, vShow, Fragment, toDisplayString, shallowRef, normalizeStyle, normalizeClass, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { V as VAppBar, a as VContainer, b as VToolbarTitle, c as VSpacer, d as VBtn, e as VDivider, f as VIcon, g as VNavigationDrawer, h as VList, i as VListItem, j as VListItemTitle, k as VRow, l as VCol, m as VCard, _ as _imports_0, r as VCardText, R as Ripple, u as useBorder, s as useDensity, o as useElevation, t as useSize, v as useGroupItem, w as useLink, x as useVariant, y as genOverlays, z as VExpandXTransition, A as VDefaultsProvider, n as VAvatar, B as makeVariantProps, C as makeSizeProps, D as makeRouterProps, E as makeGroupItemProps, p as makeElevationProps, F as makeDensityProps, q as makeBorderProps, G as makeGroupProps, H as useGroup, I as VFadeTransition, J as deepEqual } from './VNavigationDrawer-hPorNPVn.mjs';
import { _ as _export_sfc, g as genericComponent, n as navigateTo, p as propsFactory, q as useLocale, d as provideTheme, s as useProxiedModel, m as makeThemeProps, E as EventProp, I as IconValue, i as makeDisplayProps, j as useRtl, h as useDisplay, k as useGoTo, o as provideDefaults, l as focusableChildren } from './server.mjs';
import { u as useHead } from './composables-C0E_lS2T.mjs';
import { V as VApp, a as VMain, b as VImg, c as useRounded, m as makeTagProps, g as makeRoundedProps, i as makeComponentProps, d as useResizeObserver, f as useRender } from './VMain-u6qFTvOC.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

function calculateUpdatedTarget(_ref) {
  let {
    selectedElement,
    containerElement,
    isRtl,
    isHorizontal
  } = _ref;
  const containerSize = getOffsetSize(isHorizontal, containerElement);
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
  const childrenSize = getOffsetSize(isHorizontal, selectedElement);
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
  const additionalOffset = childrenSize * 0.4;
  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset;
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset;
  }
  return scrollPosition;
}
function getScrollSize(isHorizontal, element) {
  const key = isHorizontal ? "scrollWidth" : "scrollHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getClientSize(isHorizontal, element) {
  const key = isHorizontal ? "clientWidth" : "clientHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getScrollPosition(isHorizontal, rtl, element) {
  if (!element) {
    return 0;
  }
  const {
    scrollLeft,
    offsetWidth,
    scrollWidth
  } = element;
  if (isHorizontal) {
    return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
  }
  return element.scrollTop;
}
function getOffsetSize(isHorizontal, element) {
  const key = isHorizontal ? "offsetWidth" : "offsetHeight";
  return (element == null ? void 0 : element[key]) || 0;
}
function getOffsetPosition(isHorizontal, element) {
  const key = isHorizontal ? "offsetLeft" : "offsetTop";
  return (element == null ? void 0 : element[key]) || 0;
}
const VSlideGroupSymbol = Symbol.for("vuetify:v-slide-group");
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  scrollToActive: {
    type: Boolean,
    default: true
  },
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || ["always", "desktop", "mobile"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup");
const VSlideGroup = genericComponent()({
  name: "VSlideGroup",
  props: makeVSlideGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    shallowRef(0);
    const isHorizontal = computed(() => props.direction === "horizontal");
    const {
      resizeRef: containerRef
    } = useResizeObserver();
    const {
      resizeRef: contentRef
    } = useResizeObserver();
    useGoTo();
    computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: "easeOutQuart"
      };
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[0]);
    });
    computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex((item) => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      {
        calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
    }
    function onScroll(e) {
      const {
        scrollTop,
        scrollLeft
      } = e.target;
      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    let ignoreFocusEvent = false;
    function onFocus(e) {
      var _a;
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && ((_a = contentRef.el) == null ? void 0 : _a.contains(e.relatedTarget)))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === "ArrowRight") {
          toFocus(isRtl.value ? "prev" : "next");
        } else if (e.key === "ArrowLeft") {
          toFocus(isRtl.value ? "next" : "prev");
        }
      } else {
        if (e.key === "ArrowDown") {
          toFocus("next");
        } else if (e.key === "ArrowUp") {
          toFocus("prev");
        }
      }
      if (e.key === "Home") {
        toFocus("first");
      } else if (e.key === "End") {
        toFocus("last");
      }
    }
    function getSiblingElement(el, location) {
      if (!el) return void 0;
      let sibling = el;
      do {
        sibling = sibling == null ? void 0 : sibling[location === "next" ? "nextElementSibling" : "previousElementSibling"];
      } while (sibling == null ? void 0 : sibling.hasAttribute("disabled"));
      return sibling;
    }
    function focus(location) {
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === "next") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("first");
      } else if (location === "prev") {
        el = getSiblingElement(contentRef.el.querySelector(":focus"), location);
        if (!el) return focus("last");
      } else if (location === "first") {
        el = contentRef.el.firstElementChild;
        if (el == null ? void 0 : el.hasAttribute("disabled")) el = getSiblingElement(el, "next");
      } else if (location === "last") {
        el = contentRef.el.lastElementChild;
        if (el == null ? void 0 : el.hasAttribute("disabled")) el = getSiblingElement(el, "prev");
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function scrollTo(location) {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;
      const offsetStep = (location === "prev" ? -direction : direction) * containerSize.value;
      scrollOffset.value + offsetStep;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
      }
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasOverflowOrScroll = computed(() => isOverflowing.value || Math.abs(scrollOffset.value) > 0);
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case "always":
          return true;
        // Always show arrows on desktop
        case "desktop":
          return !mobile.value;
        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true:
          return hasOverflowOrScroll.value;
        // Always show on mobile
        case "mobile":
          return mobile.value || hasOverflowOrScroll.value;
        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !mobile.value && hasOverflowOrScroll.value;
      }
    });
    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!containerRef.value || !hasOverflowOrScroll.value) return false;
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);
      const scrollSizeMax = scrollSize - clientSize;
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-slide-group", {
        "v-slide-group--vertical": !isHorizontal.value,
        "v-slide-group--has-affixes": hasAffixes.value,
        "v-slide-group--is-overflowing": isOverflowing.value
      }, displayClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => {
        var _a, _b, _c, _d, _e;
        return [hasAffixes.value && createElementVNode("div", {
          "key": "prev",
          "class": normalizeClass(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !hasPrev.value
          }]),
          "onMousedown": onFocusAffixes,
          "onClick": () => hasPrev.value && scrollTo("prev")
        }, [(_b = (_a = slots.prev) == null ? void 0 : _a.call(slots, slotProps.value)) != null ? _b : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.nextIcon : props.prevIcon
          }, null)]
        })]), createElementVNode("div", {
          "key": "container",
          "ref": containerRef,
          "class": normalizeClass(["v-slide-group__container", props.contentClass]),
          "onScroll": onScroll
        }, [createElementVNode("div", {
          "ref": contentRef,
          "class": "v-slide-group__content",
          "onFocusin": onFocusin,
          "onFocusout": onFocusout,
          "onKeydown": onKeydown
        }, [(_c = slots.default) == null ? void 0 : _c.call(slots, slotProps.value)])]), hasAffixes.value && createElementVNode("div", {
          "key": "next",
          "class": normalizeClass(["v-slide-group__next", {
            "v-slide-group__next--disabled": !hasNext.value
          }]),
          "onMousedown": onFocusAffixes,
          "onClick": () => hasNext.value && scrollTo("next")
        }, [(_e = (_d = slots.next) == null ? void 0 : _d.call(slots, slotProps.value)) != null ? _e : createVNode(VFadeTransition, null, {
          default: () => [createVNode(VIcon, {
            "icon": isRtl.value ? props.prevIcon : props.nextIcon
          }, null)]
        })])];
      }
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus,
      hasPrev,
      hasNext
    };
  }
});
const VChipGroupSymbol = Symbol.for("vuetify:v-chip-group");
const makeVChipGroupProps = propsFactory({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeVSlideGroupProps({
    scrollToActive: false
  }),
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: "v-chip--selected"
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChipGroup");
genericComponent()({
  name: "VChipGroup",
  props: makeVChipGroupProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        filter: toRef(() => props.filter),
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "class": ["v-chip-group", {
          "v-chip-group--column": props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots, {
            isSelected,
            select,
            next,
            prev,
            selected: selected.value
          })];
        }
      });
    });
    return {};
  }
});
const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: IconValue,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "span"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "tonal"
  })
}, "VChip");
const VChip = genericComponent()({
  name: "VChip",
  directives: {
    vRipple: Ripple
  },
  props: makeVChipProps(),
  emits: {
    "click:close": (e) => true,
    "update:modelValue": (value) => true,
    "group:selected": (val) => true,
    click: (e) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, "modelValue");
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const slideGroup = useGroupItem(props, VSlideGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = toRef(() => ({
      "aria-label": t(props.closeLabel),
      disabled: props.disabled,
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        isActive.value = false;
        emit("click:close", e);
      }
    }));
    watch(isActive, (val) => {
      if (val) {
        group == null ? void 0 : group.register();
        slideGroup == null ? void 0 : slideGroup.register();
      } else {
        group == null ? void 0 : group.unregister();
        slideGroup == null ? void 0 : slideGroup.unregister();
      }
    });
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => {
      var _a;
      const showColor = !group || group.isSelected.value;
      return {
        color: showColor ? (_a = props.color) != null ? _a : props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    function onClick(e) {
      var _a;
      emit("click", e);
      if (!isClickable.value) return;
      (_a = link.navigate) == null ? void 0 : _a.call(link, e);
      group == null ? void 0 : group.toggle();
    }
    function onKeyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      var _a;
      const Tag = link.isLink.value ? "a" : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      return isActive.value && withDirectives(createVNode(Tag, mergeProps(link.linkProps, {
        "class": ["v-chip", {
          "v-chip--disabled": props.disabled,
          "v-chip--label": props.label,
          "v-chip--link": isClickable.value,
          "v-chip--filter": hasFilter,
          "v-chip--pill": props.pill,
          [`${props.activeClass}`]: props.activeClass && ((_a = link.isActive) == null ? void 0 : _a.value)
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group == null ? void 0 : group.selectedClass.value, props.class],
        "style": [colorStyles.value, props.style],
        "disabled": props.disabled || void 0,
        "draggable": props.draggable,
        "tabindex": isClickable.value ? 0 : void 0,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }), {
        default: () => {
          var _a2, _b;
          return [genOverlays(isClickable.value, "v-chip"), hasFilter && createVNode(VExpandXTransition, {
            "key": "filter"
          }, {
            default: () => [withDirectives(createElementVNode("div", {
              "class": "v-chip__filter"
            }, [!slots.filter ? createVNode(VIcon, {
              "key": "filter-icon",
              "icon": props.filterIcon
            }, null) : createVNode(VDefaultsProvider, {
              "key": "filter-defaults",
              "disabled": !props.filterIcon,
              "defaults": {
                VIcon: {
                  icon: props.filterIcon
                }
              }
            }, slots.filter)]), [[vShow, group.isSelected.value]])]
          }), hasPrepend && createElementVNode("div", {
            "key": "prepend",
            "class": "v-chip__prepend"
          }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "icon": props.prependIcon,
            "start": true
          }, null), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "image": props.prependAvatar,
            "start": true
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "disabled": !hasPrependMedia,
            "defaults": {
              VAvatar: {
                image: props.prependAvatar,
                start: true
              },
              VIcon: {
                icon: props.prependIcon,
                start: true
              }
            }
          }, slots.prepend)]), createElementVNode("div", {
            "class": "v-chip__content",
            "data-no-activator": ""
          }, [(_b = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
            isSelected: group == null ? void 0 : group.isSelected.value,
            selectedClass: group == null ? void 0 : group.selectedClass.value,
            select: group == null ? void 0 : group.select,
            toggle: group == null ? void 0 : group.toggle,
            value: group == null ? void 0 : group.value.value,
            disabled: props.disabled
          })) != null ? _b : toDisplayString(props.text)]), hasAppend && createElementVNode("div", {
            "key": "append",
            "class": "v-chip__append"
          }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
            "key": "append-icon",
            "end": true,
            "icon": props.appendIcon
          }, null), props.appendAvatar && createVNode(VAvatar, {
            "key": "append-avatar",
            "end": true,
            "image": props.appendAvatar
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "append-defaults",
            "disabled": !hasAppendMedia,
            "defaults": {
              VAvatar: {
                end: true,
                image: props.appendAvatar
              },
              VIcon: {
                end: true,
                icon: props.appendIcon
              }
            }
          }, slots.append)]), hasClose && createElementVNode("button", mergeProps({
            "key": "close",
            "class": "v-chip__close",
            "type": "button",
            "data-testid": "close-chip"
          }, closeProps.value), [!slots.close ? createVNode(VIcon, {
            "key": "close-icon",
            "icon": props.closeIcon,
            "size": "x-small"
          }, null) : createVNode(VDefaultsProvider, {
            "key": "close-defaults",
            "defaults": {
              VIcon: {
                icon: props.closeIcon,
                size: "x-small"
              }
            }
          }, slots.close)])];
        }
      }), [[Ripple, isClickable.value && props.ripple, null]]);
    };
  }
});
const _sfc_main = {
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const drawer = ref(false);
    const goToPage = (path) => {
      navigateTo(path);
    };
    const goToSection = (path) => {
      drawer.value = false;
      navigateTo(path);
    };
    useHead({
      title: "Calendario de Eventos - Avivamiento Monterrey",
      meta: [
        {
          name: "description",
          content: "Descubre los pr\xF3ximos eventos y actividades especiales de la Iglesia Avivamiento Monterrey."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAppBar, {
              app: "",
              color: "#041845",
              elevation: "1",
              height: "70"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, { class: "d-flex align-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VToolbarTitle, {
                          class: "text-h6 font-weight-bold",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` AV MTY `);
                            } else {
                              return [
                                createTextVNode(" AV MTY ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(`<div class="d-none d-sm-flex align-center" data-v-3beb16af${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          to: "/land",
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Inicio `);
                            } else {
                              return [
                                createTextVNode(" Inicio ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => goToPage("/land#horarios"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Horarios `);
                            } else {
                              return [
                                createTextVNode(" Horarios ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => goToPage("/land#ubicacion"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Ubicaci\xF3n `);
                            } else {
                              return [
                                createTextVNode(" Ubicaci\xF3n ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => goToPage("/land#contacto"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Contacto `);
                            } else {
                              return [
                                createTextVNode(" Contacto ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, {
                          vertical: "",
                          class: "mx-4",
                          style: { "border-color": "rgba(255,255,255,0.3)" }
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { size: "24" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-facebook`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-facebook")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-facebook")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://www.instagram.com/avivamientomonterrey/",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { size: "24" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-instagram`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-instagram")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-instagram")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://www.tiktok.com/@avivamientomonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { size: "24" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-music-note`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-music-note")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-music-note")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, { size: "24" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-spotify`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-spotify")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-spotify")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          class: "d-sm-none",
                          style: { "color": "white" },
                          onClick: ($event) => drawer.value = !drawer.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-menu`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-menu")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-menu")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VToolbarTitle, {
                            class: "text-h6 font-weight-bold",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" AV MTY ")
                            ]),
                            _: 1
                          }),
                          createVNode(VSpacer),
                          createVNode("div", { class: "d-none d-sm-flex align-center" }, [
                            createVNode(VBtn, {
                              to: "/land",
                              variant: "text",
                              class: "mx-0 text-body-1",
                              style: { "text-transform": "none", "color": "white" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Inicio ")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              onClick: ($event) => goToPage("/land#horarios"),
                              variant: "text",
                              class: "mx-0 text-body-1",
                              style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Horarios ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              onClick: ($event) => goToPage("/land#ubicacion"),
                              variant: "text",
                              class: "mx-0 text-body-1",
                              style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ubicaci\xF3n ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              onClick: ($event) => goToPage("/land#contacto"),
                              variant: "text",
                              class: "mx-0 text-body-1",
                              style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Contacto ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VDivider, {
                              vertical: "",
                              class: "mx-4",
                              style: { "border-color": "rgba(255,255,255,0.3)" }
                            }),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                              target: "_blank",
                              style: { "color": "white" }
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-facebook")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              href: "https://www.instagram.com/avivamientomonterrey/",
                              target: "_blank",
                              style: { "color": "white" }
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-instagram")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              href: "https://www.tiktok.com/@avivamientomonterrey",
                              target: "_blank",
                              style: { "color": "white" }
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-music-note")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                              target: "_blank",
                              style: { "color": "white" }
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { size: "24" }, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-spotify")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            class: "d-sm-none",
                            style: { "color": "white" },
                            onClick: ($event) => drawer.value = !drawer.value
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-menu")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, { class: "d-flex align-center" }, {
                      default: withCtx(() => [
                        createVNode(VToolbarTitle, {
                          class: "text-h6 font-weight-bold",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" AV MTY ")
                          ]),
                          _: 1
                        }),
                        createVNode(VSpacer),
                        createVNode("div", { class: "d-none d-sm-flex align-center" }, [
                          createVNode(VBtn, {
                            to: "/land",
                            variant: "text",
                            class: "mx-0 text-body-1",
                            style: { "text-transform": "none", "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Inicio ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            onClick: ($event) => goToPage("/land#horarios"),
                            variant: "text",
                            class: "mx-0 text-body-1",
                            style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Horarios ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            onClick: ($event) => goToPage("/land#ubicacion"),
                            variant: "text",
                            class: "mx-0 text-body-1",
                            style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ubicaci\xF3n ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            onClick: ($event) => goToPage("/land#contacto"),
                            variant: "text",
                            class: "mx-0 text-body-1",
                            style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Contacto ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VDivider, {
                            vertical: "",
                            class: "mx-4",
                            style: { "border-color": "rgba(255,255,255,0.3)" }
                          }),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { size: "24" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-facebook")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            href: "https://www.instagram.com/avivamientomonterrey/",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { size: "24" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-instagram")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            href: "https://www.tiktok.com/@avivamientomonterrey",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { size: "24" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-music-note")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { size: "24" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-spotify")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          class: "d-sm-none",
                          style: { "color": "white" },
                          onClick: ($event) => drawer.value = !drawer.value
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-menu")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VNavigationDrawer, {
              modelValue: drawer.value,
              "onUpdate:modelValue": ($event) => drawer.value = $event,
              temporary: "",
              location: "right",
              style: { "background-color": "#041845" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VList, { style: { "background-color": "#041845" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VListItem, {
                          to: "/land",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Inicio`);
                                  } else {
                                    return [
                                      createTextVNode("Inicio")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Inicio")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          onClick: ($event) => goToSection("/land#horarios"),
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Horarios`);
                                  } else {
                                    return [
                                      createTextVNode("Horarios")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Horarios")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          onClick: ($event) => goToSection("/land#ubicacion"),
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Ubicaci\xF3n`);
                                  } else {
                                    return [
                                      createTextVNode("Ubicaci\xF3n")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Ubicaci\xF3n")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          onClick: ($event) => goToSection("/land#contacto"),
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Contacto`);
                                  } else {
                                    return [
                                      createTextVNode("Contacto")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Contacto")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, {
                          class: "my-4",
                          style: { "border-color": "rgba(255,255,255,0.3)" }
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-facebook`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-facebook")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-facebook")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Facebook`);
                                  } else {
                                    return [
                                      createTextVNode("Facebook")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Facebook")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          href: "https://www.instagram.com/avivamientomonterrey/",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-instagram`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-instagram")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-instagram")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Instagram`);
                                  } else {
                                    return [
                                      createTextVNode("Instagram")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Instagram")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          href: "https://www.tiktok.com/@avivamientomonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-music-note`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-music-note")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-music-note")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`TikTok`);
                                  } else {
                                    return [
                                      createTextVNode("TikTok")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("TikTok")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`mdi-spotify`);
                                  } else {
                                    return [
                                      createTextVNode("mdi-spotify")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("mdi-spotify")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Spotify`);
                                  } else {
                                    return [
                                      createTextVNode("Spotify")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Spotify")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VListItem, {
                            to: "/land",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Inicio")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, {
                            onClick: ($event) => goToSection("/land#horarios"),
                            style: { "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Horarios")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VListItem, {
                            onClick: ($event) => goToSection("/land#ubicacion"),
                            style: { "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Ubicaci\xF3n")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VListItem, {
                            onClick: ($event) => goToSection("/land#contacto"),
                            style: { "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Contacto")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VDivider, {
                            class: "my-4",
                            style: { "border-color": "rgba(255,255,255,0.3)" }
                          }),
                          createVNode(VListItem, {
                            href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            prepend: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-facebook")
                                ]),
                                _: 1
                              })
                            ]),
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Facebook")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, {
                            href: "https://www.instagram.com/avivamientomonterrey/",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            prepend: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-instagram")
                                ]),
                                _: 1
                              })
                            ]),
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Instagram")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, {
                            href: "https://www.tiktok.com/@avivamientomonterrey",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            prepend: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-music-note")
                                ]),
                                _: 1
                              })
                            ]),
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("TikTok")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, {
                            href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                            target: "_blank",
                            style: { "color": "white" }
                          }, {
                            prepend: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-spotify")
                                ]),
                                _: 1
                              })
                            ]),
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Spotify")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VList, { style: { "background-color": "#041845" } }, {
                      default: withCtx(() => [
                        createVNode(VListItem, {
                          to: "/land",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Inicio")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, {
                          onClick: ($event) => goToSection("/land#horarios"),
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Horarios")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VListItem, {
                          onClick: ($event) => goToSection("/land#ubicacion"),
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Ubicaci\xF3n")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VListItem, {
                          onClick: ($event) => goToSection("/land#contacto"),
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Contacto")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VDivider, {
                          class: "my-4",
                          style: { "border-color": "rgba(255,255,255,0.3)" }
                        }),
                        createVNode(VListItem, {
                          href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-facebook")
                              ]),
                              _: 1
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Facebook")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, {
                          href: "https://www.instagram.com/avivamientomonterrey/",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-instagram")
                              ]),
                              _: 1
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Instagram")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, {
                          href: "https://www.tiktok.com/@avivamientomonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-music-note")
                              ]),
                              _: 1
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("TikTok")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, {
                          href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("mdi-spotify")
                              ]),
                              _: 1
                            })
                          ]),
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Spotify")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, { class: "bg-grey-lighten-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, { class: "py-16" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { justify: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "6",
                                lg: "5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCard, {
                                      elevation: "0",
                                      class: "event-card",
                                      style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VImg, {
                                            src: _imports_0,
                                            height: "250",
                                            cover: "",
                                            gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex flex-column fill-height pa-4" data-v-3beb16af${_scopeId7}>`);
                                                _push8(ssrRenderComponent(VChip, {
                                                  color: "#041845",
                                                  size: "small",
                                                  class: "mb-2",
                                                  style: { "width": "fit-content" }
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` PR\xD3XIMAMENTE `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" PR\xD3XIMAMENTE ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                                    createVNode(VChip, {
                                                      color: "#041845",
                                                      size: "small",
                                                      class: "mb-2",
                                                      style: { "width": "fit-content" }
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" PR\xD3XIMAMENTE ")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex align-center mb-3" data-v-3beb16af${_scopeId7}>`);
                                                _push8(ssrRenderComponent(VIcon, {
                                                  color: "#041845",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`mdi-calendar`);
                                                    } else {
                                                      return [
                                                        createTextVNode("mdi-calendar")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<span class="text-body-2" style="${ssrRenderStyle({ "color": "#666" })}" data-v-3beb16af${_scopeId7}>Diciembre 2025</span></div><h3 class="text-h5 font-weight-regular mb-3" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-3beb16af${_scopeId7}> Fiesta Navide\xF1a </h3><p class="text-body-2 mb-4" style="${ssrRenderStyle({ "color": "#555", "line-height": "1.8" })}" data-v-3beb16af${_scopeId7}> Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. </p><div class="d-flex align-center" data-v-3beb16af${_scopeId7}>`);
                                                _push8(ssrRenderComponent(VIcon, {
                                                  size: "small",
                                                  color: "#666",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`mdi-clock-outline`);
                                                    } else {
                                                      return [
                                                        createTextVNode("mdi-clock-outline")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<span class="text-body-2" style="${ssrRenderStyle({ "color": "#666" })}" data-v-3beb16af${_scopeId7}>Por confirmar</span></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex align-center mb-3" }, [
                                                    createVNode(VIcon, {
                                                      color: "#041845",
                                                      class: "mr-2"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-calendar")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("span", {
                                                      class: "text-body-2",
                                                      style: { "color": "#666" }
                                                    }, "Diciembre 2025")
                                                  ]),
                                                  createVNode("h3", {
                                                    class: "text-h5 font-weight-regular mb-3",
                                                    style: { "color": "#041845" }
                                                  }, " Fiesta Navide\xF1a "),
                                                  createVNode("p", {
                                                    class: "text-body-2 mb-4",
                                                    style: { "color": "#555", "line-height": "1.8" }
                                                  }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                                  createVNode("div", { class: "d-flex align-center" }, [
                                                    createVNode(VIcon, {
                                                      size: "small",
                                                      color: "#666",
                                                      class: "mr-2"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-clock-outline")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("span", {
                                                      class: "text-body-2",
                                                      style: { "color": "#666" }
                                                    }, "Por confirmar")
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VImg, {
                                              src: _imports_0,
                                              height: "250",
                                              cover: "",
                                              gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                                  createVNode(VChip, {
                                                    color: "#041845",
                                                    size: "small",
                                                    class: "mb-2",
                                                    style: { "width": "fit-content" }
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" PR\xD3XIMAMENTE ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCardText, { class: "pa-6" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex align-center mb-3" }, [
                                                  createVNode(VIcon, {
                                                    color: "#041845",
                                                    class: "mr-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-calendar")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("span", {
                                                    class: "text-body-2",
                                                    style: { "color": "#666" }
                                                  }, "Diciembre 2025")
                                                ]),
                                                createVNode("h3", {
                                                  class: "text-h5 font-weight-regular mb-3",
                                                  style: { "color": "#041845" }
                                                }, " Fiesta Navide\xF1a "),
                                                createVNode("p", {
                                                  class: "text-body-2 mb-4",
                                                  style: { "color": "#555", "line-height": "1.8" }
                                                }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                                createVNode("div", { class: "d-flex align-center" }, [
                                                  createVNode(VIcon, {
                                                    size: "small",
                                                    color: "#666",
                                                    class: "mr-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-clock-outline")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("span", {
                                                    class: "text-body-2",
                                                    style: { "color": "#666" }
                                                  }, "Por confirmar")
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCard, {
                                        elevation: "0",
                                        class: "event-card",
                                        style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VImg, {
                                            src: _imports_0,
                                            height: "250",
                                            cover: "",
                                            gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                                createVNode(VChip, {
                                                  color: "#041845",
                                                  size: "small",
                                                  class: "mb-2",
                                                  style: { "width": "fit-content" }
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" PR\xD3XIMAMENTE ")
                                                  ]),
                                                  _: 1
                                                })
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCardText, { class: "pa-6" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex align-center mb-3" }, [
                                                createVNode(VIcon, {
                                                  color: "#041845",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-calendar")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("span", {
                                                  class: "text-body-2",
                                                  style: { "color": "#666" }
                                                }, "Diciembre 2025")
                                              ]),
                                              createVNode("h3", {
                                                class: "text-h5 font-weight-regular mb-3",
                                                style: { "color": "#041845" }
                                              }, " Fiesta Navide\xF1a "),
                                              createVNode("p", {
                                                class: "text-body-2 mb-4",
                                                style: { "color": "#555", "line-height": "1.8" }
                                              }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                              createVNode("div", { class: "d-flex align-center" }, [
                                                createVNode(VIcon, {
                                                  size: "small",
                                                  color: "#666",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-clock-outline")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("span", {
                                                  class: "text-body-2",
                                                  style: { "color": "#666" }
                                                }, "Por confirmar")
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "6",
                                lg: "5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCard, {
                                      elevation: "0",
                                      class: "event-card",
                                      style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VImg, {
                                            src: _imports_0,
                                            height: "250",
                                            cover: "",
                                            gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex flex-column fill-height pa-4" data-v-3beb16af${_scopeId7}>`);
                                                _push8(ssrRenderComponent(VChip, {
                                                  color: "#041845",
                                                  size: "small",
                                                  class: "mb-2",
                                                  style: { "width": "fit-content" }
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` PR\xD3XIMAMENTE `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" PR\xD3XIMAMENTE ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`</div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                                    createVNode(VChip, {
                                                      color: "#041845",
                                                      size: "small",
                                                      class: "mb-2",
                                                      style: { "width": "fit-content" }
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" PR\xD3XIMAMENTE ")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCardText, { class: "pa-6" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<div class="d-flex align-center mb-3" data-v-3beb16af${_scopeId7}>`);
                                                _push8(ssrRenderComponent(VIcon, {
                                                  color: "#041845",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`mdi-calendar`);
                                                    } else {
                                                      return [
                                                        createTextVNode("mdi-calendar")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<span class="text-body-2" style="${ssrRenderStyle({ "color": "#666" })}" data-v-3beb16af${_scopeId7}>Diciembre 2025</span></div><h3 class="text-h5 font-weight-regular mb-3" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-3beb16af${_scopeId7}> Obra Navide\xF1a </h3><p class="text-body-2 mb-4" style="${ssrRenderStyle({ "color": "#555", "line-height": "1.8" })}" data-v-3beb16af${_scopeId7}> Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. </p><div class="d-flex align-center" data-v-3beb16af${_scopeId7}>`);
                                                _push8(ssrRenderComponent(VIcon, {
                                                  size: "small",
                                                  color: "#666",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`mdi-clock-outline`);
                                                    } else {
                                                      return [
                                                        createTextVNode("mdi-clock-outline")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(`<span class="text-body-2" style="${ssrRenderStyle({ "color": "#666" })}" data-v-3beb16af${_scopeId7}>Por confirmar</span></div>`);
                                              } else {
                                                return [
                                                  createVNode("div", { class: "d-flex align-center mb-3" }, [
                                                    createVNode(VIcon, {
                                                      color: "#041845",
                                                      class: "mr-2"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-calendar")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("span", {
                                                      class: "text-body-2",
                                                      style: { "color": "#666" }
                                                    }, "Diciembre 2025")
                                                  ]),
                                                  createVNode("h3", {
                                                    class: "text-h5 font-weight-regular mb-3",
                                                    style: { "color": "#041845" }
                                                  }, " Obra Navide\xF1a "),
                                                  createVNode("p", {
                                                    class: "text-body-2 mb-4",
                                                    style: { "color": "#555", "line-height": "1.8" }
                                                  }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                                  createVNode("div", { class: "d-flex align-center" }, [
                                                    createVNode(VIcon, {
                                                      size: "small",
                                                      color: "#666",
                                                      class: "mr-2"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-clock-outline")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode("span", {
                                                      class: "text-body-2",
                                                      style: { "color": "#666" }
                                                    }, "Por confirmar")
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VImg, {
                                              src: _imports_0,
                                              height: "250",
                                              cover: "",
                                              gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                                  createVNode(VChip, {
                                                    color: "#041845",
                                                    size: "small",
                                                    class: "mb-2",
                                                    style: { "width": "fit-content" }
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" PR\xD3XIMAMENTE ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCardText, { class: "pa-6" }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex align-center mb-3" }, [
                                                  createVNode(VIcon, {
                                                    color: "#041845",
                                                    class: "mr-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-calendar")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("span", {
                                                    class: "text-body-2",
                                                    style: { "color": "#666" }
                                                  }, "Diciembre 2025")
                                                ]),
                                                createVNode("h3", {
                                                  class: "text-h5 font-weight-regular mb-3",
                                                  style: { "color": "#041845" }
                                                }, " Obra Navide\xF1a "),
                                                createVNode("p", {
                                                  class: "text-body-2 mb-4",
                                                  style: { "color": "#555", "line-height": "1.8" }
                                                }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                                createVNode("div", { class: "d-flex align-center" }, [
                                                  createVNode(VIcon, {
                                                    size: "small",
                                                    color: "#666",
                                                    class: "mr-2"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-clock-outline")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode("span", {
                                                    class: "text-body-2",
                                                    style: { "color": "#666" }
                                                  }, "Por confirmar")
                                                ])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCard, {
                                        elevation: "0",
                                        class: "event-card",
                                        style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VImg, {
                                            src: _imports_0,
                                            height: "250",
                                            cover: "",
                                            gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                                createVNode(VChip, {
                                                  color: "#041845",
                                                  size: "small",
                                                  class: "mb-2",
                                                  style: { "width": "fit-content" }
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" PR\xD3XIMAMENTE ")
                                                  ]),
                                                  _: 1
                                                })
                                              ])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCardText, { class: "pa-6" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex align-center mb-3" }, [
                                                createVNode(VIcon, {
                                                  color: "#041845",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-calendar")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("span", {
                                                  class: "text-body-2",
                                                  style: { "color": "#666" }
                                                }, "Diciembre 2025")
                                              ]),
                                              createVNode("h3", {
                                                class: "text-h5 font-weight-regular mb-3",
                                                style: { "color": "#041845" }
                                              }, " Obra Navide\xF1a "),
                                              createVNode("p", {
                                                class: "text-body-2 mb-4",
                                                style: { "color": "#555", "line-height": "1.8" }
                                              }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                              createVNode("div", { class: "d-flex align-center" }, [
                                                createVNode(VIcon, {
                                                  size: "small",
                                                  color: "#666",
                                                  class: "mr-2"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-clock-outline")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("span", {
                                                  class: "text-body-2",
                                                  style: { "color": "#666" }
                                                }, "Por confirmar")
                                              ])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6",
                                  lg: "5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      elevation: "0",
                                      class: "event-card",
                                      style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, {
                                          src: _imports_0,
                                          height: "250",
                                          cover: "",
                                          gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                              createVNode(VChip, {
                                                color: "#041845",
                                                size: "small",
                                                class: "mb-2",
                                                style: { "width": "fit-content" }
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" PR\xD3XIMAMENTE ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardText, { class: "pa-6" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex align-center mb-3" }, [
                                              createVNode(VIcon, {
                                                color: "#041845",
                                                class: "mr-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-calendar")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("span", {
                                                class: "text-body-2",
                                                style: { "color": "#666" }
                                              }, "Diciembre 2025")
                                            ]),
                                            createVNode("h3", {
                                              class: "text-h5 font-weight-regular mb-3",
                                              style: { "color": "#041845" }
                                            }, " Fiesta Navide\xF1a "),
                                            createVNode("p", {
                                              class: "text-body-2 mb-4",
                                              style: { "color": "#555", "line-height": "1.8" }
                                            }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                            createVNode("div", { class: "d-flex align-center" }, [
                                              createVNode(VIcon, {
                                                size: "small",
                                                color: "#666",
                                                class: "mr-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-clock-outline")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("span", {
                                                class: "text-body-2",
                                                style: { "color": "#666" }
                                              }, "Por confirmar")
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6",
                                  lg: "5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      elevation: "0",
                                      class: "event-card",
                                      style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, {
                                          src: _imports_0,
                                          height: "250",
                                          cover: "",
                                          gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                              createVNode(VChip, {
                                                color: "#041845",
                                                size: "small",
                                                class: "mb-2",
                                                style: { "width": "fit-content" }
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" PR\xD3XIMAMENTE ")
                                                ]),
                                                _: 1
                                              })
                                            ])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardText, { class: "pa-6" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex align-center mb-3" }, [
                                              createVNode(VIcon, {
                                                color: "#041845",
                                                class: "mr-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-calendar")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("span", {
                                                class: "text-body-2",
                                                style: { "color": "#666" }
                                              }, "Diciembre 2025")
                                            ]),
                                            createVNode("h3", {
                                              class: "text-h5 font-weight-regular mb-3",
                                              style: { "color": "#041845" }
                                            }, " Obra Navide\xF1a "),
                                            createVNode("p", {
                                              class: "text-body-2 mb-4",
                                              style: { "color": "#555", "line-height": "1.8" }
                                            }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                            createVNode("div", { class: "d-flex align-center" }, [
                                              createVNode(VIcon, {
                                                size: "small",
                                                color: "#666",
                                                class: "mr-2"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-clock-outline")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("span", {
                                                class: "text-body-2",
                                                style: { "color": "#666" }
                                              }, "Por confirmar")
                                            ])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { justify: "center" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "6",
                                lg: "5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    elevation: "0",
                                    class: "event-card",
                                    style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VImg, {
                                        src: _imports_0,
                                        height: "250",
                                        cover: "",
                                        gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                            createVNode(VChip, {
                                              color: "#041845",
                                              size: "small",
                                              class: "mb-2",
                                              style: { "width": "fit-content" }
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" PR\xD3XIMAMENTE ")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, { class: "pa-6" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex align-center mb-3" }, [
                                            createVNode(VIcon, {
                                              color: "#041845",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-calendar")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", {
                                              class: "text-body-2",
                                              style: { "color": "#666" }
                                            }, "Diciembre 2025")
                                          ]),
                                          createVNode("h3", {
                                            class: "text-h5 font-weight-regular mb-3",
                                            style: { "color": "#041845" }
                                          }, " Fiesta Navide\xF1a "),
                                          createVNode("p", {
                                            class: "text-body-2 mb-4",
                                            style: { "color": "#555", "line-height": "1.8" }
                                          }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                          createVNode("div", { class: "d-flex align-center" }, [
                                            createVNode(VIcon, {
                                              size: "small",
                                              color: "#666",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-clock-outline")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", {
                                              class: "text-body-2",
                                              style: { "color": "#666" }
                                            }, "Por confirmar")
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6",
                                lg: "5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    elevation: "0",
                                    class: "event-card",
                                    style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VImg, {
                                        src: _imports_0,
                                        height: "250",
                                        cover: "",
                                        gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                            createVNode(VChip, {
                                              color: "#041845",
                                              size: "small",
                                              class: "mb-2",
                                              style: { "width": "fit-content" }
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" PR\xD3XIMAMENTE ")
                                              ]),
                                              _: 1
                                            })
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, { class: "pa-6" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex align-center mb-3" }, [
                                            createVNode(VIcon, {
                                              color: "#041845",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-calendar")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", {
                                              class: "text-body-2",
                                              style: { "color": "#666" }
                                            }, "Diciembre 2025")
                                          ]),
                                          createVNode("h3", {
                                            class: "text-h5 font-weight-regular mb-3",
                                            style: { "color": "#041845" }
                                          }, " Obra Navide\xF1a "),
                                          createVNode("p", {
                                            class: "text-body-2 mb-4",
                                            style: { "color": "#555", "line-height": "1.8" }
                                          }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                          createVNode("div", { class: "d-flex align-center" }, [
                                            createVNode(VIcon, {
                                              size: "small",
                                              color: "#666",
                                              class: "mr-2"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-clock-outline")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("span", {
                                              class: "text-body-2",
                                              style: { "color": "#666" }
                                            }, "Por confirmar")
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, { class: "py-16" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { justify: "center" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "6",
                              lg: "5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  elevation: "0",
                                  class: "event-card",
                                  style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VImg, {
                                      src: _imports_0,
                                      height: "250",
                                      cover: "",
                                      gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                          createVNode(VChip, {
                                            color: "#041845",
                                            size: "small",
                                            class: "mb-2",
                                            style: { "width": "fit-content" }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" PR\xD3XIMAMENTE ")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, { class: "pa-6" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-center mb-3" }, [
                                          createVNode(VIcon, {
                                            color: "#041845",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-calendar")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", {
                                            class: "text-body-2",
                                            style: { "color": "#666" }
                                          }, "Diciembre 2025")
                                        ]),
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-regular mb-3",
                                          style: { "color": "#041845" }
                                        }, " Fiesta Navide\xF1a "),
                                        createVNode("p", {
                                          class: "text-body-2 mb-4",
                                          style: { "color": "#555", "line-height": "1.8" }
                                        }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                        createVNode("div", { class: "d-flex align-center" }, [
                                          createVNode(VIcon, {
                                            size: "small",
                                            color: "#666",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-clock-outline")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", {
                                            class: "text-body-2",
                                            style: { "color": "#666" }
                                          }, "Por confirmar")
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "6",
                              lg: "5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  elevation: "0",
                                  class: "event-card",
                                  style: { "border": "1px solid #e0e0e0", "height": "100%" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VImg, {
                                      src: _imports_0,
                                      height: "250",
                                      cover: "",
                                      gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                          createVNode(VChip, {
                                            color: "#041845",
                                            size: "small",
                                            class: "mb-2",
                                            style: { "width": "fit-content" }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" PR\xD3XIMAMENTE ")
                                            ]),
                                            _: 1
                                          })
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, { class: "pa-6" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-center mb-3" }, [
                                          createVNode(VIcon, {
                                            color: "#041845",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-calendar")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", {
                                            class: "text-body-2",
                                            style: { "color": "#666" }
                                          }, "Diciembre 2025")
                                        ]),
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-regular mb-3",
                                          style: { "color": "#041845" }
                                        }, " Obra Navide\xF1a "),
                                        createVNode("p", {
                                          class: "text-body-2 mb-4",
                                          style: { "color": "#555", "line-height": "1.8" }
                                        }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                        createVNode("div", { class: "d-flex align-center" }, [
                                          createVNode(VIcon, {
                                            size: "small",
                                            color: "#666",
                                            class: "mr-2"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-clock-outline")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("span", {
                                            class: "text-body-2",
                                            style: { "color": "#666" }
                                          }, "Por confirmar")
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VAppBar, {
                app: "",
                color: "#041845",
                elevation: "1",
                height: "70"
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, { class: "d-flex align-center" }, {
                    default: withCtx(() => [
                      createVNode(VToolbarTitle, {
                        class: "text-h6 font-weight-bold",
                        style: { "color": "white" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" AV MTY ")
                        ]),
                        _: 1
                      }),
                      createVNode(VSpacer),
                      createVNode("div", { class: "d-none d-sm-flex align-center" }, [
                        createVNode(VBtn, {
                          to: "/land",
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Inicio ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          onClick: ($event) => goToPage("/land#horarios"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Horarios ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          onClick: ($event) => goToPage("/land#ubicacion"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Ubicaci\xF3n ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          onClick: ($event) => goToPage("/land#contacto"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Contacto ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VDivider, {
                          vertical: "",
                          class: "mx-4",
                          style: { "border-color": "rgba(255,255,255,0.3)" }
                        }),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { size: "24" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-facebook")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://www.instagram.com/avivamientomonterrey/",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { size: "24" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-instagram")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://www.tiktok.com/@avivamientomonterrey",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { size: "24" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-music-note")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                          target: "_blank",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { size: "24" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-spotify")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(VBtn, {
                        icon: "",
                        variant: "text",
                        class: "d-sm-none",
                        style: { "color": "white" },
                        onClick: ($event) => drawer.value = !drawer.value
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-menu")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VNavigationDrawer, {
                modelValue: drawer.value,
                "onUpdate:modelValue": ($event) => drawer.value = $event,
                temporary: "",
                location: "right",
                style: { "background-color": "#041845" }
              }, {
                default: withCtx(() => [
                  createVNode(VList, { style: { "background-color": "#041845" } }, {
                    default: withCtx(() => [
                      createVNode(VListItem, {
                        to: "/land",
                        style: { "color": "white" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Inicio")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        onClick: ($event) => goToSection("/land#horarios"),
                        style: { "color": "white", "cursor": "pointer" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Horarios")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VListItem, {
                        onClick: ($event) => goToSection("/land#ubicacion"),
                        style: { "color": "white", "cursor": "pointer" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Ubicaci\xF3n")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VListItem, {
                        onClick: ($event) => goToSection("/land#contacto"),
                        style: { "color": "white", "cursor": "pointer" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Contacto")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VDivider, {
                        class: "my-4",
                        style: { "border-color": "rgba(255,255,255,0.3)" }
                      }),
                      createVNode(VListItem, {
                        href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                        target: "_blank",
                        style: { "color": "white" }
                      }, {
                        prepend: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-facebook")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Facebook")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        href: "https://www.instagram.com/avivamientomonterrey/",
                        target: "_blank",
                        style: { "color": "white" }
                      }, {
                        prepend: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-instagram")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Instagram")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        href: "https://www.tiktok.com/@avivamientomonterrey",
                        target: "_blank",
                        style: { "color": "white" }
                      }, {
                        prepend: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-music-note")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("TikTok")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                        target: "_blank",
                        style: { "color": "white" }
                      }, {
                        prepend: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("mdi-spotify")
                            ]),
                            _: 1
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Spotify")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VMain, { class: "bg-grey-lighten-4" }, {
                default: withCtx(() => [
                  createVNode(VContainer, { class: "py-16" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { justify: "center" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                elevation: "0",
                                class: "event-card",
                                style: { "border": "1px solid #e0e0e0", "height": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(VImg, {
                                    src: _imports_0,
                                    height: "250",
                                    cover: "",
                                    gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                        createVNode(VChip, {
                                          color: "#041845",
                                          size: "small",
                                          class: "mb-2",
                                          style: { "width": "fit-content" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" PR\xD3XIMAMENTE ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, { class: "pa-6" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-center mb-3" }, [
                                        createVNode(VIcon, {
                                          color: "#041845",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-calendar")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", {
                                          class: "text-body-2",
                                          style: { "color": "#666" }
                                        }, "Diciembre 2025")
                                      ]),
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-regular mb-3",
                                        style: { "color": "#041845" }
                                      }, " Fiesta Navide\xF1a "),
                                      createVNode("p", {
                                        class: "text-body-2 mb-4",
                                        style: { "color": "#555", "line-height": "1.8" }
                                      }, " Celebra con nosotros la Navidad en una noche llena de alegr\xEDa, convivencia familiar y actividades especiales para toda la familia. "),
                                      createVNode("div", { class: "d-flex align-center" }, [
                                        createVNode(VIcon, {
                                          size: "small",
                                          color: "#666",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-clock-outline")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", {
                                          class: "text-body-2",
                                          style: { "color": "#666" }
                                        }, "Por confirmar")
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                elevation: "0",
                                class: "event-card",
                                style: { "border": "1px solid #e0e0e0", "height": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(VImg, {
                                    src: _imports_0,
                                    height: "250",
                                    cover: "",
                                    gradient: "to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex flex-column fill-height pa-4" }, [
                                        createVNode(VChip, {
                                          color: "#041845",
                                          size: "small",
                                          class: "mb-2",
                                          style: { "width": "fit-content" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" PR\xD3XIMAMENTE ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, { class: "pa-6" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-center mb-3" }, [
                                        createVNode(VIcon, {
                                          color: "#041845",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-calendar")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", {
                                          class: "text-body-2",
                                          style: { "color": "#666" }
                                        }, "Diciembre 2025")
                                      ]),
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-regular mb-3",
                                        style: { "color": "#041845" }
                                      }, " Obra Navide\xF1a "),
                                      createVNode("p", {
                                        class: "text-body-2 mb-4",
                                        style: { "color": "#555", "line-height": "1.8" }
                                      }, " Disfruta de una presentaci\xF3n especial donde celebramos el verdadero significado de la Navidad a trav\xE9s de una obra teatral. "),
                                      createVNode("div", { class: "d-flex align-center" }, [
                                        createVNode(VIcon, {
                                          size: "small",
                                          color: "#666",
                                          class: "mr-2"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-clock-outline")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("span", {
                                          class: "text-body-2",
                                          style: { "color": "#666" }
                                        }, "Por confirmar")
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/calendar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const calendar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3beb16af"]]);

export { calendar as default };
//# sourceMappingURL=calendar-DhEAXaYz.mjs.map
