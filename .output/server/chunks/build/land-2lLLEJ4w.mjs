import { ref, computed, withCtx, createTextVNode, createVNode, toDisplayString, shallowRef, toRef, watchEffect, normalizeStyle, normalizeClass, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { V as VAppBar, a as VContainer, b as VToolbarTitle, c as VSpacer, d as VBtn, e as VDivider, f as VIcon, g as VNavigationDrawer, h as VList, i as VListItem, j as VListItemTitle, _ as _imports_0, k as VRow, l as VCol, m as VCard, n as VAvatar, u as useBorder, o as useElevation, p as makeElevationProps, q as makeBorderProps } from './VNavigationDrawer-hPorNPVn.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useHead } from './composables-C0E_lS2T.mjs';
import { _ as _export_sfc, h as useDisplay, g as genericComponent, p as propsFactory, d as provideTheme, e as useToggleScope, m as makeThemeProps, f as convertToUnit } from './server.mjs';
import { V as VApp, a as VMain, b as VImg, u as useBackgroundColor, c as useRounded, d as useResizeObserver, e as useLayoutItem, f as useRender, m as makeTagProps, g as makeRoundedProps, h as makeLayoutItemProps, i as makeComponentProps } from './VMain-u6qFTvOC.mjs';
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

const _imports_1 = publicAssetsURL("/images/pastor_adrian.jpg");
const _imports_2 = publicAssetsURL("/images/pastora_sara.png");
const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: "auto"
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "footer"
  }),
  ...makeThemeProps()
}, "VFooter");
const VFooter = genericComponent()({
  name: "VFooter",
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const layoutItemStyles = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver();
    const height = computed(() => props.height === "auto" ? autoHeight.value : parseInt(props.height, 10));
    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(() => "bottom"),
        layoutSize: height,
        elementSize: computed(() => props.height === "auto" ? void 0 : height.value),
        active: toRef(() => props.app),
        absolute: toRef(() => props.absolute)
      });
      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(["v-footer", themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style])
    }, slots));
    return {};
  }
});
const _sfc_main = {
  __name: "land",
  __ssrInlineRender: true,
  setup(__props) {
    const drawer = ref(false);
    const scrolled = ref(false);
    const { mobile, width, height } = useDisplay();
    const isMobile = computed(() => mobile.value);
    const heroHeight = computed(() => {
      if (!isMobile.value) return "calc(100vh + 70px)";
      const aspectRatio = width.value / height.value;
      if (aspectRatio <= 0.43) return "40vh";
      if (aspectRatio <= 0.5) return "45vh";
      if (aspectRatio <= 0.7) return "55vh";
      return "65vh";
    });
    const scrollToSection = (sectionId) => {
      const element = (void 0).getElementById(sectionId);
      if (element) {
        const offset = 40;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + (void 0).pageYOffset - offset;
        (void 0).scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };
    useHead({
      title: "Avivamiento Monterrey - Pastores Adrian Aguirre y Sara Aguirre",
      meta: [
        {
          name: "description",
          content: "Iglesia Avivamiento Monterrey liderada por los Pastores Adrian Aguirre y Sara Aguirre. Una iglesia cristiana comprometida con la comunidad de Monterrey, Nuevo León."
        },
        {
          name: "keywords",
          content: "Avivamiento Monterrey, Adrian Aguirre, Sara Aguirre, iglesia Monterrey, iglesia cristiana Monterrey, pastor Adrian Aguirre, pastora Sara Aguirre, cultos Monterrey"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAppBar, {
              app: "",
              color: scrolled.value ? "#041845" : "transparent",
              elevation: scrolled.value ? 1 : 0,
              height: "70",
              style: scrolled.value ? "border-bottom: 1px solid rgba(255,255,255,0.1);" : "",
              class: "navbar-transition",
              flat: ""
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
                        _push4(`<div class="d-none d-sm-flex align-center" data-v-4934762d${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, {
                          href: "/calendar",
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Eventos `);
                            } else {
                              return [
                                createTextVNode(" Eventos ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => scrollToSection("horarios"),
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
                          onClick: ($event) => scrollToSection("ubicacion"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Ubicación `);
                            } else {
                              return [
                                createTextVNode(" Ubicación ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          onClick: ($event) => scrollToSection("contacto"),
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
                          size: "default",
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
                              href: "/calendar",
                              variant: "text",
                              class: "mx-0 text-body-1",
                              style: { "text-transform": "none", "color": "white" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Eventos ")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              onClick: ($event) => scrollToSection("horarios"),
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
                              onClick: ($event) => scrollToSection("ubicacion"),
                              variant: "text",
                              class: "mx-0 text-body-1",
                              style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ubicación ")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              onClick: ($event) => scrollToSection("contacto"),
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
                              size: "default",
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
                            href: "/calendar",
                            variant: "text",
                            class: "mx-0 text-body-1",
                            style: { "text-transform": "none", "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Eventos ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            onClick: ($event) => scrollToSection("horarios"),
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
                            onClick: ($event) => scrollToSection("ubicacion"),
                            variant: "text",
                            class: "mx-0 text-body-1",
                            style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ubicación ")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            onClick: ($event) => scrollToSection("contacto"),
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
                            size: "default",
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
                          href: "/calendar",
                          style: { "color": "white" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Eventos`);
                                  } else {
                                    return [
                                      createTextVNode("Eventos")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Eventos")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          onClick: ($event) => {
                            drawer.value = false;
                            scrollToSection("horarios");
                          },
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
                          onClick: ($event) => {
                            drawer.value = false;
                            scrollToSection("ubicacion");
                          },
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Ubicación`);
                                  } else {
                                    return [
                                      createTextVNode("Ubicación")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Ubicación")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VListItem, {
                          onClick: ($event) => {
                            drawer.value = false;
                            scrollToSection("contacto");
                          },
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
                            href: "/calendar",
                            style: { "color": "white" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Eventos")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VListItem, {
                            onClick: ($event) => {
                              drawer.value = false;
                              scrollToSection("horarios");
                            },
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
                            onClick: ($event) => {
                              drawer.value = false;
                              scrollToSection("ubicacion");
                            },
                            style: { "color": "white", "cursor": "pointer" }
                          }, {
                            default: withCtx(() => [
                              createVNode(VListItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Ubicación")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VListItem, {
                            onClick: ($event) => {
                              drawer.value = false;
                              scrollToSection("contacto");
                            },
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
                          href: "/calendar",
                          style: { "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Eventos")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VListItem, {
                          onClick: ($event) => {
                            drawer.value = false;
                            scrollToSection("horarios");
                          },
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
                          onClick: ($event) => {
                            drawer.value = false;
                            scrollToSection("ubicacion");
                          },
                          style: { "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createVNode(VListItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Ubicación")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VListItem, {
                          onClick: ($event) => {
                            drawer.value = false;
                            scrollToSection("contacto");
                          },
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
            _push2(ssrRenderComponent(VMain, { class: "pa-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, {
                    fluid: "",
                    class: "hero-section pa-0",
                    style: { "margin-top": "-70px" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, {
                          src: _imports_0,
                          height: heroHeight.value,
                          cover: "",
                          position: isMobile.value ? "center center" : "center center"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, {
                            src: _imports_0,
                            height: heroHeight.value,
                            cover: "",
                            position: isMobile.value ? "center center" : "center center"
                          }, null, 8, ["height", "position"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VContainer, { class: "py-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center mb-1"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-overline mb-2" style="${ssrRenderStyle({ "color": "#666", "letter-spacing": "2px" })}" data-v-4934762d${_scopeId5}>LIDERAZGO</p><h2 class="text-h3 font-weight-light" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId5}>Nuestros Pastores</h2>`);
                                  } else {
                                    return [
                                      createVNode("p", {
                                        class: "text-overline mb-2",
                                        style: { "color": "#666", "letter-spacing": "2px" }
                                      }, "LIDERAZGO"),
                                      createVNode("h2", {
                                        class: "text-h3 font-weight-light",
                                        style: { "color": "#041845" }
                                      }, "Nuestros Pastores")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center mb-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", {
                                      class: "text-overline mb-2",
                                      style: { "color": "#666", "letter-spacing": "2px" }
                                    }, "LIDERAZGO"),
                                    createVNode("h2", {
                                      class: "text-h3 font-weight-light",
                                      style: { "color": "#041845" }
                                    }, "Nuestros Pastores")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, { justify: "center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCard, {
                                      elevation: "0",
                                      class: "text-center pa-4",
                                      style: { "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAvatar, {
                                            size: "180",
                                            class: "mb-2"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VImg, { src: _imports_1 }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VImg, { src: _imports_1 })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`<h3 class="text-h5 font-weight-regular" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId6}>Adrian Aguirre</h3><p class="text-body-2 text-grey mb-2" style="${ssrRenderStyle({ "text-transform": "uppercase", "letter-spacing": "1px" })}" data-v-4934762d${_scopeId6}>Pastor Principal</p><p class="text-body-1" style="${ssrRenderStyle({ "color": "#555", "line-height": "1.8" })}" data-v-4934762d${_scopeId6}> Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. </p>`);
                                        } else {
                                          return [
                                            createVNode(VAvatar, {
                                              size: "180",
                                              class: "mb-2"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VImg, { src: _imports_1 })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("h3", {
                                              class: "text-h5 font-weight-regular",
                                              style: { "color": "#041845" }
                                            }, "Adrian Aguirre"),
                                            createVNode("p", {
                                              class: "text-body-2 text-grey mb-2",
                                              style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                            }, "Pastor Principal"),
                                            createVNode("p", {
                                              class: "text-body-1",
                                              style: { "color": "#555", "line-height": "1.8" }
                                            }, " Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCard, {
                                        elevation: "0",
                                        class: "text-center pa-4",
                                        style: { "border": "1px solid #e0e0e0" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAvatar, {
                                            size: "180",
                                            class: "mb-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VImg, { src: _imports_1 })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("h3", {
                                            class: "text-h5 font-weight-regular",
                                            style: { "color": "#041845" }
                                          }, "Adrian Aguirre"),
                                          createVNode("p", {
                                            class: "text-body-2 text-grey mb-2",
                                            style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                          }, "Pastor Principal"),
                                          createVNode("p", {
                                            class: "text-body-1",
                                            style: { "color": "#555", "line-height": "1.8" }
                                          }, " Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. ")
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
                                md: "5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCard, {
                                      elevation: "0",
                                      class: "text-center pa-4",
                                      style: { "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VAvatar, {
                                            size: "180",
                                            class: "mb-2"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VImg, { src: _imports_2 }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VImg, { src: _imports_2 })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`<h3 class="text-h5 font-weight-regular" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId6}>Sara Aguirre</h3><p class="text-body-2 text-grey mb-2" style="${ssrRenderStyle({ "text-transform": "uppercase", "letter-spacing": "1px" })}" data-v-4934762d${_scopeId6}>Co-Pastora</p><p class="text-body-1" style="${ssrRenderStyle({ "color": "#555", "line-height": "1.8" })}" data-v-4934762d${_scopeId6}> Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. </p>`);
                                        } else {
                                          return [
                                            createVNode(VAvatar, {
                                              size: "180",
                                              class: "mb-2"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VImg, { src: _imports_2 })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("h3", {
                                              class: "text-h5 font-weight-regular",
                                              style: { "color": "#041845" }
                                            }, "Sara Aguirre"),
                                            createVNode("p", {
                                              class: "text-body-2 text-grey mb-2",
                                              style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                            }, "Co-Pastora"),
                                            createVNode("p", {
                                              class: "text-body-1",
                                              style: { "color": "#555", "line-height": "1.8" }
                                            }, " Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCard, {
                                        elevation: "0",
                                        class: "text-center pa-4",
                                        style: { "border": "1px solid #e0e0e0" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAvatar, {
                                            size: "180",
                                            class: "mb-2"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VImg, { src: _imports_2 })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("h3", {
                                            class: "text-h5 font-weight-regular",
                                            style: { "color": "#041845" }
                                          }, "Sara Aguirre"),
                                          createVNode("p", {
                                            class: "text-body-2 text-grey mb-2",
                                            style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                          }, "Co-Pastora"),
                                          createVNode("p", {
                                            class: "text-body-1",
                                            style: { "color": "#555", "line-height": "1.8" }
                                          }, " Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. ")
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
                                  md: "5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      elevation: "0",
                                      class: "text-center pa-4",
                                      style: { "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAvatar, {
                                          size: "180",
                                          class: "mb-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VImg, { src: _imports_1 })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-regular",
                                          style: { "color": "#041845" }
                                        }, "Adrian Aguirre"),
                                        createVNode("p", {
                                          class: "text-body-2 text-grey mb-2",
                                          style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                        }, "Pastor Principal"),
                                        createVNode("p", {
                                          class: "text-body-1",
                                          style: { "color": "#555", "line-height": "1.8" }
                                        }, " Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      elevation: "0",
                                      class: "text-center pa-4",
                                      style: { "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAvatar, {
                                          size: "180",
                                          class: "mb-2"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VImg, { src: _imports_2 })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-regular",
                                          style: { "color": "#041845" }
                                        }, "Sara Aguirre"),
                                        createVNode("p", {
                                          class: "text-body-2 text-grey mb-2",
                                          style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                        }, "Co-Pastora"),
                                        createVNode("p", {
                                          class: "text-body-1",
                                          style: { "color": "#555", "line-height": "1.8" }
                                        }, " Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. ")
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
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center mb-1"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", {
                                    class: "text-overline mb-2",
                                    style: { "color": "#666", "letter-spacing": "2px" }
                                  }, "LIDERAZGO"),
                                  createVNode("h2", {
                                    class: "text-h3 font-weight-light",
                                    style: { "color": "#041845" }
                                  }, "Nuestros Pastores")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { justify: "center" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    elevation: "0",
                                    class: "text-center pa-4",
                                    style: { "border": "1px solid #e0e0e0" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAvatar, {
                                        size: "180",
                                        class: "mb-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VImg, { src: _imports_1 })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-regular",
                                        style: { "color": "#041845" }
                                      }, "Adrian Aguirre"),
                                      createVNode("p", {
                                        class: "text-body-2 text-grey mb-2",
                                        style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                      }, "Pastor Principal"),
                                      createVNode("p", {
                                        class: "text-body-1",
                                        style: { "color": "#555", "line-height": "1.8" }
                                      }, " Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    elevation: "0",
                                    class: "text-center pa-4",
                                    style: { "border": "1px solid #e0e0e0" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VAvatar, {
                                        size: "180",
                                        class: "mb-2"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VImg, { src: _imports_2 })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-regular",
                                        style: { "color": "#041845" }
                                      }, "Sara Aguirre"),
                                      createVNode("p", {
                                        class: "text-body-2 text-grey mb-2",
                                        style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                      }, "Co-Pastora"),
                                      createVNode("p", {
                                        class: "text-body-1",
                                        style: { "color": "#555", "line-height": "1.8" }
                                      }, " Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. ")
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
                  _push3(ssrRenderComponent(VContainer, {
                    fluid: "",
                    id: "horarios",
                    class: "py-4",
                    style: { "background-color": "#f8f9fa" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      class: "text-center"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-overline mb-2" style="${ssrRenderStyle({ "color": "#666", "letter-spacing": "2px" })}" data-v-4934762d${_scopeId6}>REUNIONES</p><h2 class="text-h3 font-weight-light" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId6}>Horarios de Culto</h2>`);
                                        } else {
                                          return [
                                            createVNode("p", {
                                              class: "text-overline mb-2",
                                              style: { "color": "#666", "letter-spacing": "2px" }
                                            }, "REUNIONES"),
                                            createVNode("h2", {
                                              class: "text-h3 font-weight-light",
                                              style: { "color": "#041845" }
                                            }, "Horarios de Culto")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "text-center"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", {
                                            class: "text-overline mb-2",
                                            style: { "color": "#666", "letter-spacing": "2px" }
                                          }, "REUNIONES"),
                                          createVNode("h2", {
                                            class: "text-h3 font-weight-light",
                                            style: { "color": "#041845" }
                                          }, "Horarios de Culto")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, { justify: "center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCard, {
                                            class: "text-center pa-3",
                                            elevation: "0",
                                            style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<h3 class="text-h5 font-weight-light mb-4" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId7}>Domingo</h3><p class="text-h6 mb-2" style="${ssrRenderStyle({ "color": "#555" })}" data-v-4934762d${_scopeId7}>11:00 AM</p><p class="text-body-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-4934762d${_scopeId7}>Reunión General</p>`);
                                              } else {
                                                return [
                                                  createVNode("h3", {
                                                    class: "text-h5 font-weight-light mb-4",
                                                    style: { "color": "#041845" }
                                                  }, "Domingo"),
                                                  createVNode("p", {
                                                    class: "text-h6 mb-2",
                                                    style: { "color": "#555" }
                                                  }, "11:00 AM"),
                                                  createVNode("p", {
                                                    class: "text-body-2",
                                                    style: { "color": "#888" }
                                                  }, "Reunión General")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCard, {
                                              class: "text-center pa-3",
                                              elevation: "0",
                                              style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("h3", {
                                                  class: "text-h5 font-weight-light mb-4",
                                                  style: { "color": "#041845" }
                                                }, "Domingo"),
                                                createVNode("p", {
                                                  class: "text-h6 mb-2",
                                                  style: { "color": "#555" }
                                                }, "11:00 AM"),
                                                createVNode("p", {
                                                  class: "text-body-2",
                                                  style: { "color": "#888" }
                                                }, "Reunión General")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCard, {
                                            class: "text-center pa-3",
                                            elevation: "0",
                                            style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<h3 class="text-h5 font-weight-light mb-4" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId7}>Miércoles</h3><p class="text-h6 mb-2" style="${ssrRenderStyle({ "color": "#555" })}" data-v-4934762d${_scopeId7}>8:00 PM</p><p class="text-body-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-4934762d${_scopeId7}>Reunión General</p>`);
                                              } else {
                                                return [
                                                  createVNode("h3", {
                                                    class: "text-h5 font-weight-light mb-4",
                                                    style: { "color": "#041845" }
                                                  }, "Miércoles"),
                                                  createVNode("p", {
                                                    class: "text-h6 mb-2",
                                                    style: { "color": "#555" }
                                                  }, "8:00 PM"),
                                                  createVNode("p", {
                                                    class: "text-body-2",
                                                    style: { "color": "#888" }
                                                  }, "Reunión General")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCard, {
                                              class: "text-center pa-3",
                                              elevation: "0",
                                              style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("h3", {
                                                  class: "text-h5 font-weight-light mb-4",
                                                  style: { "color": "#041845" }
                                                }, "Miércoles"),
                                                createVNode("p", {
                                                  class: "text-h6 mb-2",
                                                  style: { "color": "#555" }
                                                }, "8:00 PM"),
                                                createVNode("p", {
                                                  class: "text-body-2",
                                                  style: { "color": "#888" }
                                                }, "Reunión General")
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
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VCard, {
                                            class: "text-center pa-3",
                                            elevation: "0",
                                            style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("h3", {
                                                class: "text-h5 font-weight-light mb-4",
                                                style: { "color": "#041845" }
                                              }, "Domingo"),
                                              createVNode("p", {
                                                class: "text-h6 mb-2",
                                                style: { "color": "#555" }
                                              }, "11:00 AM"),
                                              createVNode("p", {
                                                class: "text-body-2",
                                                style: { "color": "#888" }
                                              }, "Reunión General")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VCard, {
                                            class: "text-center pa-3",
                                            elevation: "0",
                                            style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("h3", {
                                                class: "text-h5 font-weight-light mb-4",
                                                style: { "color": "#041845" }
                                              }, "Miércoles"),
                                              createVNode("p", {
                                                class: "text-h6 mb-2",
                                                style: { "color": "#555" }
                                              }, "8:00 PM"),
                                              createVNode("p", {
                                                class: "text-body-2",
                                                style: { "color": "#888" }
                                              }, "Reunión General")
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
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "text-center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", {
                                          class: "text-overline mb-2",
                                          style: { "color": "#666", "letter-spacing": "2px" }
                                        }, "REUNIONES"),
                                        createVNode("h2", {
                                          class: "text-h3 font-weight-light",
                                          style: { "color": "#041845" }
                                        }, "Horarios de Culto")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, { justify: "center" }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VCard, {
                                          class: "text-center pa-3",
                                          elevation: "0",
                                          style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("h3", {
                                              class: "text-h5 font-weight-light mb-4",
                                              style: { "color": "#041845" }
                                            }, "Domingo"),
                                            createVNode("p", {
                                              class: "text-h6 mb-2",
                                              style: { "color": "#555" }
                                            }, "11:00 AM"),
                                            createVNode("p", {
                                              class: "text-body-2",
                                              style: { "color": "#888" }
                                            }, "Reunión General")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VCard, {
                                          class: "text-center pa-3",
                                          elevation: "0",
                                          style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("h3", {
                                              class: "text-h5 font-weight-light mb-4",
                                              style: { "color": "#041845" }
                                            }, "Miércoles"),
                                            createVNode("p", {
                                              class: "text-h6 mb-2",
                                              style: { "color": "#555" }
                                            }, "8:00 PM"),
                                            createVNode("p", {
                                              class: "text-body-2",
                                              style: { "color": "#888" }
                                            }, "Reunión General")
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
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", {
                                        class: "text-overline mb-2",
                                        style: { "color": "#666", "letter-spacing": "2px" }
                                      }, "REUNIONES"),
                                      createVNode("h2", {
                                        class: "text-h3 font-weight-light",
                                        style: { "color": "#041845" }
                                      }, "Horarios de Culto")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, { justify: "center" }, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCard, {
                                        class: "text-center pa-3",
                                        elevation: "0",
                                        style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("h3", {
                                            class: "text-h5 font-weight-light mb-4",
                                            style: { "color": "#041845" }
                                          }, "Domingo"),
                                          createVNode("p", {
                                            class: "text-h6 mb-2",
                                            style: { "color": "#555" }
                                          }, "11:00 AM"),
                                          createVNode("p", {
                                            class: "text-body-2",
                                            style: { "color": "#888" }
                                          }, "Reunión General")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCard, {
                                        class: "text-center pa-3",
                                        elevation: "0",
                                        style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("h3", {
                                            class: "text-h5 font-weight-light mb-4",
                                            style: { "color": "#041845" }
                                          }, "Miércoles"),
                                          createVNode("p", {
                                            class: "text-h6 mb-2",
                                            style: { "color": "#555" }
                                          }, "8:00 PM"),
                                          createVNode("p", {
                                            class: "text-body-2",
                                            style: { "color": "#888" }
                                          }, "Reunión General")
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
                  _push3(ssrRenderComponent(VContainer, {
                    id: "ubicacion",
                    class: "py-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-overline mb-2" style="${ssrRenderStyle({ "color": "#666", "letter-spacing": "2px" })}" data-v-4934762d${_scopeId5}>ENCÚENTRANOS</p><h2 class="text-h3 font-weight-light" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId5}>Ubicación</h2>`);
                                  } else {
                                    return [
                                      createVNode("p", {
                                        class: "text-overline mb-2",
                                        style: { "color": "#666", "letter-spacing": "2px" }
                                      }, "ENCÚENTRANOS"),
                                      createVNode("h2", {
                                        class: "text-h3 font-weight-light",
                                        style: { "color": "#041845" }
                                      }, "Ubicación")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", {
                                      class: "text-overline mb-2",
                                      style: { "color": "#666", "letter-spacing": "2px" }
                                    }, "ENCÚENTRANOS"),
                                    createVNode("h2", {
                                      class: "text-h3 font-weight-light",
                                      style: { "color": "#041845" }
                                    }, "Ubicación")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="pa-4" data-v-4934762d${_scopeId5}><h3 class="text-h5 font-weight-light mb-1" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId5}>Iglesia Avivamiento Monterrey</h3><div class="mb-6" data-v-4934762d${_scopeId5}><p class="text-overline mb-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-4934762d${_scopeId5}>DIRECCIÓN</p><p class="text-body-1" style="${ssrRenderStyle({ "color": "#555" })}" data-v-4934762d${_scopeId5}> Av. Santo Domingo #215, Col. Mezquital, Apodaca, México </p></div><div class="mb-6" data-v-4934762d${_scopeId5}><p class="text-overline mb-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-4934762d${_scopeId5}>TELÉFONO</p><p class="text-body-1" data-v-4934762d${_scopeId5}><a href="tel:+528111651800" class="text-decoration-none" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId5}> +52 (81) 1165-1800 </a></p></div><div class="mb-8" data-v-4934762d${_scopeId5}><p class="text-overline mb-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-4934762d${_scopeId5}>EMAIL</p><p class="text-body-1" data-v-4934762d${_scopeId5}><a href="mailto:info@avivamientomty.com" class="text-decoration-none" style="${ssrRenderStyle({ "color": "#041845" })}" data-v-4934762d${_scopeId5}> elavivamientomonterrey@hotmail.com </a></p></div>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      href: "https://maps.app.goo.gl/g7wBuXmhKL114A657",
                                      target: "_blank",
                                      color: "#041845",
                                      variant: "flat",
                                      size: "large",
                                      block: "",
                                      class: "mt-4",
                                      style: { "text-transform": "none" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Abrir en Google Maps `);
                                        } else {
                                          return [
                                            createTextVNode(" Abrir en Google Maps ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "pa-4" }, [
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-light mb-1",
                                          style: { "color": "#041845" }
                                        }, "Iglesia Avivamiento Monterrey"),
                                        createVNode("div", { class: "mb-6" }, [
                                          createVNode("p", {
                                            class: "text-overline mb-2",
                                            style: { "color": "#888" }
                                          }, "DIRECCIÓN"),
                                          createVNode("p", {
                                            class: "text-body-1",
                                            style: { "color": "#555" }
                                          }, " Av. Santo Domingo #215, Col. Mezquital, Apodaca, México ")
                                        ]),
                                        createVNode("div", { class: "mb-6" }, [
                                          createVNode("p", {
                                            class: "text-overline mb-2",
                                            style: { "color": "#888" }
                                          }, "TELÉFONO"),
                                          createVNode("p", { class: "text-body-1" }, [
                                            createVNode("a", {
                                              href: "tel:+528111651800",
                                              class: "text-decoration-none",
                                              style: { "color": "#041845" }
                                            }, " +52 (81) 1165-1800 ")
                                          ])
                                        ]),
                                        createVNode("div", { class: "mb-8" }, [
                                          createVNode("p", {
                                            class: "text-overline mb-2",
                                            style: { "color": "#888" }
                                          }, "EMAIL"),
                                          createVNode("p", { class: "text-body-1" }, [
                                            createVNode("a", {
                                              href: "mailto:info@avivamientomty.com",
                                              class: "text-decoration-none",
                                              style: { "color": "#041845" }
                                            }, " elavivamientomonterrey@hotmail.com ")
                                          ])
                                        ]),
                                        createVNode(VBtn, {
                                          href: "https://maps.app.goo.gl/g7wBuXmhKL114A657",
                                          target: "_blank",
                                          color: "#041845",
                                          variant: "flat",
                                          size: "large",
                                          block: "",
                                          class: "mt-4",
                                          style: { "text-transform": "none" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Abrir en Google Maps ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "7"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCard, {
                                      elevation: "0",
                                      height: "100%",
                                      style: { "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx" width="100%" height="100%" style="${ssrRenderStyle({ "border": "0", "min-height": "500px" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-v-4934762d${_scopeId6}></iframe>`);
                                        } else {
                                          return [
                                            createVNode("iframe", {
                                              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx",
                                              width: "100%",
                                              height: "100%",
                                              style: { "border": "0", "min-height": "500px" },
                                              allowfullscreen: "",
                                              loading: "lazy",
                                              referrerpolicy: "no-referrer-when-downgrade"
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
                                        height: "100%",
                                        style: { "border": "1px solid #e0e0e0" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("iframe", {
                                            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx",
                                            width: "100%",
                                            height: "100%",
                                            style: { "border": "0", "min-height": "500px" },
                                            allowfullscreen: "",
                                            loading: "lazy",
                                            referrerpolicy: "no-referrer-when-downgrade"
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
                                  md: "5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "pa-4" }, [
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-light mb-1",
                                        style: { "color": "#041845" }
                                      }, "Iglesia Avivamiento Monterrey"),
                                      createVNode("div", { class: "mb-6" }, [
                                        createVNode("p", {
                                          class: "text-overline mb-2",
                                          style: { "color": "#888" }
                                        }, "DIRECCIÓN"),
                                        createVNode("p", {
                                          class: "text-body-1",
                                          style: { "color": "#555" }
                                        }, " Av. Santo Domingo #215, Col. Mezquital, Apodaca, México ")
                                      ]),
                                      createVNode("div", { class: "mb-6" }, [
                                        createVNode("p", {
                                          class: "text-overline mb-2",
                                          style: { "color": "#888" }
                                        }, "TELÉFONO"),
                                        createVNode("p", { class: "text-body-1" }, [
                                          createVNode("a", {
                                            href: "tel:+528111651800",
                                            class: "text-decoration-none",
                                            style: { "color": "#041845" }
                                          }, " +52 (81) 1165-1800 ")
                                        ])
                                      ]),
                                      createVNode("div", { class: "mb-8" }, [
                                        createVNode("p", {
                                          class: "text-overline mb-2",
                                          style: { "color": "#888" }
                                        }, "EMAIL"),
                                        createVNode("p", { class: "text-body-1" }, [
                                          createVNode("a", {
                                            href: "mailto:info@avivamientomty.com",
                                            class: "text-decoration-none",
                                            style: { "color": "#041845" }
                                          }, " elavivamientomonterrey@hotmail.com ")
                                        ])
                                      ]),
                                      createVNode(VBtn, {
                                        href: "https://maps.app.goo.gl/g7wBuXmhKL114A657",
                                        target: "_blank",
                                        color: "#041845",
                                        variant: "flat",
                                        size: "large",
                                        block: "",
                                        class: "mt-4",
                                        style: { "text-transform": "none" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Abrir en Google Maps ")
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "7"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      elevation: "0",
                                      height: "100%",
                                      style: { "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("iframe", {
                                          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx",
                                          width: "100%",
                                          height: "100%",
                                          style: { "border": "0", "min-height": "500px" },
                                          allowfullscreen: "",
                                          loading: "lazy",
                                          referrerpolicy: "no-referrer-when-downgrade"
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
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", {
                                    class: "text-overline mb-2",
                                    style: { "color": "#666", "letter-spacing": "2px" }
                                  }, "ENCÚENTRANOS"),
                                  createVNode("h2", {
                                    class: "text-h3 font-weight-light",
                                    style: { "color": "#041845" }
                                  }, "Ubicación")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "5"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "pa-4" }, [
                                    createVNode("h3", {
                                      class: "text-h5 font-weight-light mb-1",
                                      style: { "color": "#041845" }
                                    }, "Iglesia Avivamiento Monterrey"),
                                    createVNode("div", { class: "mb-6" }, [
                                      createVNode("p", {
                                        class: "text-overline mb-2",
                                        style: { "color": "#888" }
                                      }, "DIRECCIÓN"),
                                      createVNode("p", {
                                        class: "text-body-1",
                                        style: { "color": "#555" }
                                      }, " Av. Santo Domingo #215, Col. Mezquital, Apodaca, México ")
                                    ]),
                                    createVNode("div", { class: "mb-6" }, [
                                      createVNode("p", {
                                        class: "text-overline mb-2",
                                        style: { "color": "#888" }
                                      }, "TELÉFONO"),
                                      createVNode("p", { class: "text-body-1" }, [
                                        createVNode("a", {
                                          href: "tel:+528111651800",
                                          class: "text-decoration-none",
                                          style: { "color": "#041845" }
                                        }, " +52 (81) 1165-1800 ")
                                      ])
                                    ]),
                                    createVNode("div", { class: "mb-8" }, [
                                      createVNode("p", {
                                        class: "text-overline mb-2",
                                        style: { "color": "#888" }
                                      }, "EMAIL"),
                                      createVNode("p", { class: "text-body-1" }, [
                                        createVNode("a", {
                                          href: "mailto:info@avivamientomty.com",
                                          class: "text-decoration-none",
                                          style: { "color": "#041845" }
                                        }, " elavivamientomonterrey@hotmail.com ")
                                      ])
                                    ]),
                                    createVNode(VBtn, {
                                      href: "https://maps.app.goo.gl/g7wBuXmhKL114A657",
                                      target: "_blank",
                                      color: "#041845",
                                      variant: "flat",
                                      size: "large",
                                      block: "",
                                      class: "mt-4",
                                      style: { "text-transform": "none" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Abrir en Google Maps ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "7"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    elevation: "0",
                                    height: "100%",
                                    style: { "border": "1px solid #e0e0e0" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("iframe", {
                                        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx",
                                        width: "100%",
                                        height: "100%",
                                        style: { "border": "0", "min-height": "500px" },
                                        allowfullscreen: "",
                                        loading: "lazy",
                                        referrerpolicy: "no-referrer-when-downgrade"
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
                  _push3(ssrRenderComponent(VContainer, {
                    fluid: "",
                    id: "contacto",
                    class: "py-4",
                    style: { "background-color": "#041845" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, { justify: "center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "8",
                                      class: "text-center"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<p class="text-overline mb-4" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" })}" data-v-4934762d${_scopeId6}>BIENVENIDOS</p><h2 class="text-h3 font-weight-light mb-6" style="${ssrRenderStyle({ "color": "white" })}" data-v-4934762d${_scopeId6}> Únete a Nuestra Comunidad </h2><p class="text-h6 font-weight-light mb-8" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.8)" })}" data-v-4934762d${_scopeId6}> Te invitamos a ser parte de nuestra familia en Cristo </p><div class="d-flex flex-wrap justify-center gap-4" data-v-4934762d${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VBtn, {
                                            onClick: ($event) => scrollToSection("horarios"),
                                            variant: "outlined",
                                            size: "x-large",
                                            color: "white",
                                            style: { "text-transform": "none", "cursor": "pointer" },
                                            class: "px-8"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Ver Horarios `);
                                              } else {
                                                return [
                                                  createTextVNode(" Ver Horarios ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VBtn, {
                                            onClick: ($event) => scrollToSection("ubicacion"),
                                            variant: "flat",
                                            size: "x-large",
                                            color: "white",
                                            style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                            class: "px-8"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Cómo Llegar `);
                                              } else {
                                                return [
                                                  createTextVNode(" Cómo Llegar ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(`</div>`);
                                        } else {
                                          return [
                                            createVNode("p", {
                                              class: "text-overline mb-4",
                                              style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                            }, "BIENVENIDOS"),
                                            createVNode("h2", {
                                              class: "text-h3 font-weight-light mb-6",
                                              style: { "color": "white" }
                                            }, " Únete a Nuestra Comunidad "),
                                            createVNode("p", {
                                              class: "text-h6 font-weight-light mb-8",
                                              style: { "color": "rgba(255,255,255,0.8)" }
                                            }, " Te invitamos a ser parte de nuestra familia en Cristo "),
                                            createVNode("div", { class: "d-flex flex-wrap justify-center gap-4" }, [
                                              createVNode(VBtn, {
                                                onClick: ($event) => scrollToSection("horarios"),
                                                variant: "outlined",
                                                size: "x-large",
                                                color: "white",
                                                style: { "text-transform": "none", "cursor": "pointer" },
                                                class: "px-8"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Ver Horarios ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(VBtn, {
                                                onClick: ($event) => scrollToSection("ubicacion"),
                                                variant: "flat",
                                                size: "x-large",
                                                color: "white",
                                                style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                                class: "px-8"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Cómo Llegar ")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "8",
                                        class: "text-center"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("p", {
                                            class: "text-overline mb-4",
                                            style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                          }, "BIENVENIDOS"),
                                          createVNode("h2", {
                                            class: "text-h3 font-weight-light mb-6",
                                            style: { "color": "white" }
                                          }, " Únete a Nuestra Comunidad "),
                                          createVNode("p", {
                                            class: "text-h6 font-weight-light mb-8",
                                            style: { "color": "rgba(255,255,255,0.8)" }
                                          }, " Te invitamos a ser parte de nuestra familia en Cristo "),
                                          createVNode("div", { class: "d-flex flex-wrap justify-center gap-4" }, [
                                            createVNode(VBtn, {
                                              onClick: ($event) => scrollToSection("horarios"),
                                              variant: "outlined",
                                              size: "x-large",
                                              color: "white",
                                              style: { "text-transform": "none", "cursor": "pointer" },
                                              class: "px-8"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Ver Horarios ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(VBtn, {
                                              onClick: ($event) => scrollToSection("ubicacion"),
                                              variant: "flat",
                                              size: "x-large",
                                              color: "white",
                                              style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                              class: "px-8"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Cómo Llegar ")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ])
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
                                createVNode(VRow, { justify: "center" }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "8",
                                      class: "text-center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("p", {
                                          class: "text-overline mb-4",
                                          style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                        }, "BIENVENIDOS"),
                                        createVNode("h2", {
                                          class: "text-h3 font-weight-light mb-6",
                                          style: { "color": "white" }
                                        }, " Únete a Nuestra Comunidad "),
                                        createVNode("p", {
                                          class: "text-h6 font-weight-light mb-8",
                                          style: { "color": "rgba(255,255,255,0.8)" }
                                        }, " Te invitamos a ser parte de nuestra familia en Cristo "),
                                        createVNode("div", { class: "d-flex flex-wrap justify-center gap-4" }, [
                                          createVNode(VBtn, {
                                            onClick: ($event) => scrollToSection("horarios"),
                                            variant: "outlined",
                                            size: "x-large",
                                            color: "white",
                                            style: { "text-transform": "none", "cursor": "pointer" },
                                            class: "px-8"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Ver Horarios ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(VBtn, {
                                            onClick: ($event) => scrollToSection("ubicacion"),
                                            variant: "flat",
                                            size: "x-large",
                                            color: "white",
                                            style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                            class: "px-8"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Cómo Llegar ")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VRow, { justify: "center" }, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "8",
                                    class: "text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", {
                                        class: "text-overline mb-4",
                                        style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                      }, "BIENVENIDOS"),
                                      createVNode("h2", {
                                        class: "text-h3 font-weight-light mb-6",
                                        style: { "color": "white" }
                                      }, " Únete a Nuestra Comunidad "),
                                      createVNode("p", {
                                        class: "text-h6 font-weight-light mb-8",
                                        style: { "color": "rgba(255,255,255,0.8)" }
                                      }, " Te invitamos a ser parte de nuestra familia en Cristo "),
                                      createVNode("div", { class: "d-flex flex-wrap justify-center gap-4" }, [
                                        createVNode(VBtn, {
                                          onClick: ($event) => scrollToSection("horarios"),
                                          variant: "outlined",
                                          size: "x-large",
                                          color: "white",
                                          style: { "text-transform": "none", "cursor": "pointer" },
                                          class: "px-8"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Ver Horarios ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]),
                                        createVNode(VBtn, {
                                          onClick: ($event) => scrollToSection("ubicacion"),
                                          variant: "flat",
                                          size: "x-large",
                                          color: "white",
                                          style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                          class: "px-8"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Cómo Llegar ")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VContainer, {
                      fluid: "",
                      class: "hero-section pa-0",
                      style: { "margin-top": "-70px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(VImg, {
                          src: _imports_0,
                          height: heroHeight.value,
                          cover: "",
                          position: isMobile.value ? "center center" : "center center"
                        }, null, 8, ["height", "position"])
                      ]),
                      _: 1
                    }),
                    createVNode(VContainer, { class: "py-4" }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center mb-1"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", {
                                  class: "text-overline mb-2",
                                  style: { "color": "#666", "letter-spacing": "2px" }
                                }, "LIDERAZGO"),
                                createVNode("h2", {
                                  class: "text-h3 font-weight-light",
                                  style: { "color": "#041845" }
                                }, "Nuestros Pastores")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, { justify: "center" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  elevation: "0",
                                  class: "text-center pa-4",
                                  style: { "border": "1px solid #e0e0e0" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAvatar, {
                                      size: "180",
                                      class: "mb-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, { src: _imports_1 })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("h3", {
                                      class: "text-h5 font-weight-regular",
                                      style: { "color": "#041845" }
                                    }, "Adrian Aguirre"),
                                    createVNode("p", {
                                      class: "text-body-2 text-grey mb-2",
                                      style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                    }, "Pastor Principal"),
                                    createVNode("p", {
                                      class: "text-body-1",
                                      style: { "color": "#555", "line-height": "1.8" }
                                    }, " Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "5"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  elevation: "0",
                                  class: "text-center pa-4",
                                  style: { "border": "1px solid #e0e0e0" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VAvatar, {
                                      size: "180",
                                      class: "mb-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VImg, { src: _imports_2 })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("h3", {
                                      class: "text-h5 font-weight-regular",
                                      style: { "color": "#041845" }
                                    }, "Sara Aguirre"),
                                    createVNode("p", {
                                      class: "text-body-2 text-grey mb-2",
                                      style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                    }, "Co-Pastora"),
                                    createVNode("p", {
                                      class: "text-body-1",
                                      style: { "color": "#555", "line-height": "1.8" }
                                    }, " Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. ")
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
                    }),
                    createVNode(VContainer, {
                      fluid: "",
                      id: "horarios",
                      class: "py-4",
                      style: { "background-color": "#f8f9fa" }
                    }, {
                      default: withCtx(() => [
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", {
                                      class: "text-overline mb-2",
                                      style: { "color": "#666", "letter-spacing": "2px" }
                                    }, "REUNIONES"),
                                    createVNode("h2", {
                                      class: "text-h3 font-weight-light",
                                      style: { "color": "#041845" }
                                    }, "Horarios de Culto")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, { justify: "center" }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      class: "text-center pa-3",
                                      elevation: "0",
                                      style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-light mb-4",
                                          style: { "color": "#041845" }
                                        }, "Domingo"),
                                        createVNode("p", {
                                          class: "text-h6 mb-2",
                                          style: { "color": "#555" }
                                        }, "11:00 AM"),
                                        createVNode("p", {
                                          class: "text-body-2",
                                          style: { "color": "#888" }
                                        }, "Reunión General")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      class: "text-center pa-3",
                                      elevation: "0",
                                      style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("h3", {
                                          class: "text-h5 font-weight-light mb-4",
                                          style: { "color": "#041845" }
                                        }, "Miércoles"),
                                        createVNode("p", {
                                          class: "text-h6 mb-2",
                                          style: { "color": "#555" }
                                        }, "8:00 PM"),
                                        createVNode("p", {
                                          class: "text-body-2",
                                          style: { "color": "#888" }
                                        }, "Reunión General")
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
                    }),
                    createVNode(VContainer, {
                      id: "ubicacion",
                      class: "py-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", {
                                  class: "text-overline mb-2",
                                  style: { "color": "#666", "letter-spacing": "2px" }
                                }, "ENCÚENTRANOS"),
                                createVNode("h2", {
                                  class: "text-h3 font-weight-light",
                                  style: { "color": "#041845" }
                                }, "Ubicación")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "5"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "pa-4" }, [
                                  createVNode("h3", {
                                    class: "text-h5 font-weight-light mb-1",
                                    style: { "color": "#041845" }
                                  }, "Iglesia Avivamiento Monterrey"),
                                  createVNode("div", { class: "mb-6" }, [
                                    createVNode("p", {
                                      class: "text-overline mb-2",
                                      style: { "color": "#888" }
                                    }, "DIRECCIÓN"),
                                    createVNode("p", {
                                      class: "text-body-1",
                                      style: { "color": "#555" }
                                    }, " Av. Santo Domingo #215, Col. Mezquital, Apodaca, México ")
                                  ]),
                                  createVNode("div", { class: "mb-6" }, [
                                    createVNode("p", {
                                      class: "text-overline mb-2",
                                      style: { "color": "#888" }
                                    }, "TELÉFONO"),
                                    createVNode("p", { class: "text-body-1" }, [
                                      createVNode("a", {
                                        href: "tel:+528111651800",
                                        class: "text-decoration-none",
                                        style: { "color": "#041845" }
                                      }, " +52 (81) 1165-1800 ")
                                    ])
                                  ]),
                                  createVNode("div", { class: "mb-8" }, [
                                    createVNode("p", {
                                      class: "text-overline mb-2",
                                      style: { "color": "#888" }
                                    }, "EMAIL"),
                                    createVNode("p", { class: "text-body-1" }, [
                                      createVNode("a", {
                                        href: "mailto:info@avivamientomty.com",
                                        class: "text-decoration-none",
                                        style: { "color": "#041845" }
                                      }, " elavivamientomonterrey@hotmail.com ")
                                    ])
                                  ]),
                                  createVNode(VBtn, {
                                    href: "https://maps.app.goo.gl/g7wBuXmhKL114A657",
                                    target: "_blank",
                                    color: "#041845",
                                    variant: "flat",
                                    size: "large",
                                    block: "",
                                    class: "mt-4",
                                    style: { "text-transform": "none" }
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Abrir en Google Maps ")
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "7"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  elevation: "0",
                                  height: "100%",
                                  style: { "border": "1px solid #e0e0e0" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode("iframe", {
                                      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx",
                                      width: "100%",
                                      height: "100%",
                                      style: { "border": "0", "min-height": "500px" },
                                      allowfullscreen: "",
                                      loading: "lazy",
                                      referrerpolicy: "no-referrer-when-downgrade"
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
                    }),
                    createVNode(VContainer, {
                      fluid: "",
                      id: "contacto",
                      class: "py-4",
                      style: { "background-color": "#041845" }
                    }, {
                      default: withCtx(() => [
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VRow, { justify: "center" }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "8",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", {
                                      class: "text-overline mb-4",
                                      style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                    }, "BIENVENIDOS"),
                                    createVNode("h2", {
                                      class: "text-h3 font-weight-light mb-6",
                                      style: { "color": "white" }
                                    }, " Únete a Nuestra Comunidad "),
                                    createVNode("p", {
                                      class: "text-h6 font-weight-light mb-8",
                                      style: { "color": "rgba(255,255,255,0.8)" }
                                    }, " Te invitamos a ser parte de nuestra familia en Cristo "),
                                    createVNode("div", { class: "d-flex flex-wrap justify-center gap-4" }, [
                                      createVNode(VBtn, {
                                        onClick: ($event) => scrollToSection("horarios"),
                                        variant: "outlined",
                                        size: "x-large",
                                        color: "white",
                                        style: { "text-transform": "none", "cursor": "pointer" },
                                        class: "px-8"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Ver Horarios ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(VBtn, {
                                        onClick: ($event) => scrollToSection("ubicacion"),
                                        variant: "flat",
                                        size: "x-large",
                                        color: "white",
                                        style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                        class: "px-8"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Cómo Llegar ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VFooter, {
              style: { "background-color": "#1a1a1a", "color": "white" },
              class: "py-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VContainer, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "4",
                                class: "text-center text-md-left mb-6 mb-md-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<h3 class="text-h5 font-weight-light mb-4" style="${ssrRenderStyle({ "color": "white" })}" data-v-4934762d${_scopeId5}>Avivamiento Monterrey</h3><p class="text-body-2" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.7)", "line-height": "1.8" })}" data-v-4934762d${_scopeId5}> Una iglesia cristiana comprometida<br data-v-4934762d${_scopeId5}> con la comunidad de Monterrey </p>`);
                                  } else {
                                    return [
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-light mb-4",
                                        style: { "color": "white" }
                                      }, "Avivamiento Monterrey"),
                                      createVNode("p", {
                                        class: "text-body-2",
                                        style: { "color": "rgba(255,255,255,0.7)", "line-height": "1.8" }
                                      }, [
                                        createTextVNode(" Una iglesia cristiana comprometida"),
                                        createVNode("br"),
                                        createTextVNode(" con la comunidad de Monterrey ")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "4",
                                class: "text-center mb-6 mb-md-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<h3 class="text-overline mb-4" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" })}" data-v-4934762d${_scopeId5}>SÍGUENOS</h3><div class="d-flex justify-center" data-v-4934762d${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      icon: "",
                                      variant: "text",
                                      href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                                      target: "_blank",
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, { size: "28" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-facebook`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-facebook")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VIcon, { size: "28" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-facebook")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      icon: "",
                                      variant: "text",
                                      href: "https://www.instagram.com/avivamientomonterrey/",
                                      target: "_blank",
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, { size: "28" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-instagram`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-instagram")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VIcon, { size: "28" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-instagram")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      icon: "",
                                      variant: "text",
                                      href: "https://www.tiktok.com/@avivamientomonterrey",
                                      target: "_blank",
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, { size: "28" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-music-note`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-music-note")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VIcon, { size: "28" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-music-note")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      icon: "",
                                      variant: "text",
                                      href: "https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1",
                                      target: "_blank",
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VIcon, { size: "28" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`mdi-spotify`);
                                              } else {
                                                return [
                                                  createTextVNode("mdi-spotify")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VIcon, { size: "28" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-spotify")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("h3", {
                                        class: "text-overline mb-4",
                                        style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                      }, "SÍGUENOS"),
                                      createVNode("div", { class: "d-flex justify-center" }, [
                                        createVNode(VBtn, {
                                          icon: "",
                                          variant: "text",
                                          href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                                          target: "_blank",
                                          class: "mx-2",
                                          style: { "color": "rgba(255,255,255,0.7)" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, { size: "28" }, {
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
                                          class: "mx-2",
                                          style: { "color": "rgba(255,255,255,0.7)" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, { size: "28" }, {
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
                                          class: "mx-2",
                                          style: { "color": "rgba(255,255,255,0.7)" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, { size: "28" }, {
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
                                          class: "mx-2",
                                          style: { "color": "rgba(255,255,255,0.7)" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, { size: "28" }, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-spotify")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "4",
                                class: "text-center text-md-right"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<h3 class="text-overline mb-4" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" })}" data-v-4934762d${_scopeId5}>CONTACTO</h3><p class="text-body-2 mb-2" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.7)" })}" data-v-4934762d${_scopeId5}> +52 (81) 1165-1800 </p><p class="text-body-2" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.7)" })}" data-v-4934762d${_scopeId5}> info@avivamientomty.com </p>`);
                                  } else {
                                    return [
                                      createVNode("h3", {
                                        class: "text-overline mb-4",
                                        style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                      }, "CONTACTO"),
                                      createVNode("p", {
                                        class: "text-body-2 mb-2",
                                        style: { "color": "rgba(255,255,255,0.7)" }
                                      }, " +52 (81) 1165-1800 "),
                                      createVNode("p", {
                                        class: "text-body-2",
                                        style: { "color": "rgba(255,255,255,0.7)" }
                                      }, " info@avivamientomty.com ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4",
                                  class: "text-center text-md-left mb-6 mb-md-0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h3", {
                                      class: "text-h5 font-weight-light mb-4",
                                      style: { "color": "white" }
                                    }, "Avivamiento Monterrey"),
                                    createVNode("p", {
                                      class: "text-body-2",
                                      style: { "color": "rgba(255,255,255,0.7)", "line-height": "1.8" }
                                    }, [
                                      createTextVNode(" Una iglesia cristiana comprometida"),
                                      createVNode("br"),
                                      createTextVNode(" con la comunidad de Monterrey ")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4",
                                  class: "text-center mb-6 mb-md-0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h3", {
                                      class: "text-overline mb-4",
                                      style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                    }, "SÍGUENOS"),
                                    createVNode("div", { class: "d-flex justify-center" }, [
                                      createVNode(VBtn, {
                                        icon: "",
                                        variant: "text",
                                        href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                                        target: "_blank",
                                        class: "mx-2",
                                        style: { "color": "rgba(255,255,255,0.7)" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { size: "28" }, {
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
                                        class: "mx-2",
                                        style: { "color": "rgba(255,255,255,0.7)" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { size: "28" }, {
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
                                        class: "mx-2",
                                        style: { "color": "rgba(255,255,255,0.7)" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { size: "28" }, {
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
                                        class: "mx-2",
                                        style: { "color": "rgba(255,255,255,0.7)" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, { size: "28" }, {
                                            default: withCtx(() => [
                                              createTextVNode("mdi-spotify")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4",
                                  class: "text-center text-md-right"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h3", {
                                      class: "text-overline mb-4",
                                      style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                    }, "CONTACTO"),
                                    createVNode("p", {
                                      class: "text-body-2 mb-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, " +52 (81) 1165-1800 "),
                                    createVNode("p", {
                                      class: "text-body-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, " info@avivamientomty.com ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, {
                          class: "my-6",
                          style: { "border-color": "rgba(255,255,255,0.1)" }
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-body-2" style="${ssrRenderStyle({ "color": "rgba(255,255,255,0.5)" })}" data-v-4934762d${_scopeId5}> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Avivamiento Monterrey - Todos los derechos reservados </p>`);
                                  } else {
                                    return [
                                      createVNode("p", {
                                        class: "text-body-2",
                                        style: { "color": "rgba(255,255,255,0.5)" }
                                      }, " © " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Avivamiento Monterrey - Todos los derechos reservados ", 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", {
                                      class: "text-body-2",
                                      style: { "color": "rgba(255,255,255,0.5)" }
                                    }, " © " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Avivamiento Monterrey - Todos los derechos reservados ", 1)
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
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "4",
                                class: "text-center text-md-left mb-6 mb-md-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h3", {
                                    class: "text-h5 font-weight-light mb-4",
                                    style: { "color": "white" }
                                  }, "Avivamiento Monterrey"),
                                  createVNode("p", {
                                    class: "text-body-2",
                                    style: { "color": "rgba(255,255,255,0.7)", "line-height": "1.8" }
                                  }, [
                                    createTextVNode(" Una iglesia cristiana comprometida"),
                                    createVNode("br"),
                                    createTextVNode(" con la comunidad de Monterrey ")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4",
                                class: "text-center mb-6 mb-md-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h3", {
                                    class: "text-overline mb-4",
                                    style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                  }, "SÍGUENOS"),
                                  createVNode("div", { class: "d-flex justify-center" }, [
                                    createVNode(VBtn, {
                                      icon: "",
                                      variant: "text",
                                      href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                                      target: "_blank",
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, { size: "28" }, {
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
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, { size: "28" }, {
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
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, { size: "28" }, {
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
                                      class: "mx-2",
                                      style: { "color": "rgba(255,255,255,0.7)" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, { size: "28" }, {
                                          default: withCtx(() => [
                                            createTextVNode("mdi-spotify")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4",
                                class: "text-center text-md-right"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h3", {
                                    class: "text-overline mb-4",
                                    style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                  }, "CONTACTO"),
                                  createVNode("p", {
                                    class: "text-body-2 mb-2",
                                    style: { "color": "rgba(255,255,255,0.7)" }
                                  }, " +52 (81) 1165-1800 "),
                                  createVNode("p", {
                                    class: "text-body-2",
                                    style: { "color": "rgba(255,255,255,0.7)" }
                                  }, " info@avivamientomty.com ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider, {
                            class: "my-6",
                            style: { "border-color": "rgba(255,255,255,0.1)" }
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", {
                                    class: "text-body-2",
                                    style: { "color": "rgba(255,255,255,0.5)" }
                                  }, " © " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Avivamiento Monterrey - Todos los derechos reservados ", 1)
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
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "4",
                              class: "text-center text-md-left mb-6 mb-md-0"
                            }, {
                              default: withCtx(() => [
                                createVNode("h3", {
                                  class: "text-h5 font-weight-light mb-4",
                                  style: { "color": "white" }
                                }, "Avivamiento Monterrey"),
                                createVNode("p", {
                                  class: "text-body-2",
                                  style: { "color": "rgba(255,255,255,0.7)", "line-height": "1.8" }
                                }, [
                                  createTextVNode(" Una iglesia cristiana comprometida"),
                                  createVNode("br"),
                                  createTextVNode(" con la comunidad de Monterrey ")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "4",
                              class: "text-center mb-6 mb-md-0"
                            }, {
                              default: withCtx(() => [
                                createVNode("h3", {
                                  class: "text-overline mb-4",
                                  style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                }, "SÍGUENOS"),
                                createVNode("div", { class: "d-flex justify-center" }, [
                                  createVNode(VBtn, {
                                    icon: "",
                                    variant: "text",
                                    href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                                    target: "_blank",
                                    class: "mx-2",
                                    style: { "color": "rgba(255,255,255,0.7)" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, { size: "28" }, {
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
                                    class: "mx-2",
                                    style: { "color": "rgba(255,255,255,0.7)" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, { size: "28" }, {
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
                                    class: "mx-2",
                                    style: { "color": "rgba(255,255,255,0.7)" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, { size: "28" }, {
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
                                    class: "mx-2",
                                    style: { "color": "rgba(255,255,255,0.7)" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, { size: "28" }, {
                                        default: withCtx(() => [
                                          createTextVNode("mdi-spotify")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "4",
                              class: "text-center text-md-right"
                            }, {
                              default: withCtx(() => [
                                createVNode("h3", {
                                  class: "text-overline mb-4",
                                  style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                }, "CONTACTO"),
                                createVNode("p", {
                                  class: "text-body-2 mb-2",
                                  style: { "color": "rgba(255,255,255,0.7)" }
                                }, " +52 (81) 1165-1800 "),
                                createVNode("p", {
                                  class: "text-body-2",
                                  style: { "color": "rgba(255,255,255,0.7)" }
                                }, " info@avivamientomty.com ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider, {
                          class: "my-6",
                          style: { "border-color": "rgba(255,255,255,0.1)" }
                        }),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", {
                                  class: "text-body-2",
                                  style: { "color": "rgba(255,255,255,0.5)" }
                                }, " © " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Avivamiento Monterrey - Todos los derechos reservados ", 1)
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
                color: scrolled.value ? "#041845" : "transparent",
                elevation: scrolled.value ? 1 : 0,
                height: "70",
                style: scrolled.value ? "border-bottom: 1px solid rgba(255,255,255,0.1);" : "",
                class: "navbar-transition",
                flat: ""
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
                          href: "/calendar",
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Eventos ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          onClick: ($event) => scrollToSection("horarios"),
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
                          onClick: ($event) => scrollToSection("ubicacion"),
                          variant: "text",
                          class: "mx-0 text-body-1",
                          style: { "text-transform": "none", "color": "white", "cursor": "pointer" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Ubicación ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          onClick: ($event) => scrollToSection("contacto"),
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
                          size: "default",
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
              }, 8, ["color", "elevation", "style"]),
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
                        href: "/calendar",
                        style: { "color": "white" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Eventos")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VListItem, {
                        onClick: ($event) => {
                          drawer.value = false;
                          scrollToSection("horarios");
                        },
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
                        onClick: ($event) => {
                          drawer.value = false;
                          scrollToSection("ubicacion");
                        },
                        style: { "color": "white", "cursor": "pointer" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VListItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Ubicación")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VListItem, {
                        onClick: ($event) => {
                          drawer.value = false;
                          scrollToSection("contacto");
                        },
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
              createVNode(VMain, { class: "pa-0" }, {
                default: withCtx(() => [
                  createVNode(VContainer, {
                    fluid: "",
                    class: "hero-section pa-0",
                    style: { "margin-top": "-70px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        src: _imports_0,
                        height: heroHeight.value,
                        cover: "",
                        position: isMobile.value ? "center center" : "center center"
                      }, null, 8, ["height", "position"])
                    ]),
                    _: 1
                  }),
                  createVNode(VContainer, { class: "py-4" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center mb-1"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", {
                                class: "text-overline mb-2",
                                style: { "color": "#666", "letter-spacing": "2px" }
                              }, "LIDERAZGO"),
                              createVNode("h2", {
                                class: "text-h3 font-weight-light",
                                style: { "color": "#041845" }
                              }, "Nuestros Pastores")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, { justify: "center" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                elevation: "0",
                                class: "text-center pa-4",
                                style: { "border": "1px solid #e0e0e0" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAvatar, {
                                    size: "180",
                                    class: "mb-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VImg, { src: _imports_1 })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("h3", {
                                    class: "text-h5 font-weight-regular",
                                    style: { "color": "#041845" }
                                  }, "Adrian Aguirre"),
                                  createVNode("p", {
                                    class: "text-body-2 text-grey mb-2",
                                    style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                  }, "Pastor Principal"),
                                  createVNode("p", {
                                    class: "text-body-1",
                                    style: { "color": "#555", "line-height": "1.8" }
                                  }, " Sirviendo con pasión y dedicación en el ministerio, guiando a la congregación con amor y sabiduría. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "5"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                elevation: "0",
                                class: "text-center pa-4",
                                style: { "border": "1px solid #e0e0e0" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(VAvatar, {
                                    size: "180",
                                    class: "mb-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VImg, { src: _imports_2 })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("h3", {
                                    class: "text-h5 font-weight-regular",
                                    style: { "color": "#041845" }
                                  }, "Sara Aguirre"),
                                  createVNode("p", {
                                    class: "text-body-2 text-grey mb-2",
                                    style: { "text-transform": "uppercase", "letter-spacing": "1px" }
                                  }, "Co-Pastora"),
                                  createVNode("p", {
                                    class: "text-body-1",
                                    style: { "color": "#555", "line-height": "1.8" }
                                  }, " Comprometida con el cuidado y edificación de las familias, ministrando con gracia y compasión. ")
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
                  }),
                  createVNode(VContainer, {
                    fluid: "",
                    id: "horarios",
                    class: "py-4",
                    style: { "background-color": "#f8f9fa" }
                  }, {
                    default: withCtx(() => [
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", {
                                    class: "text-overline mb-2",
                                    style: { "color": "#666", "letter-spacing": "2px" }
                                  }, "REUNIONES"),
                                  createVNode("h2", {
                                    class: "text-h3 font-weight-light",
                                    style: { "color": "#041845" }
                                  }, "Horarios de Culto")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, { justify: "center" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    class: "text-center pa-3",
                                    elevation: "0",
                                    style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-light mb-4",
                                        style: { "color": "#041845" }
                                      }, "Domingo"),
                                      createVNode("p", {
                                        class: "text-h6 mb-2",
                                        style: { "color": "#555" }
                                      }, "11:00 AM"),
                                      createVNode("p", {
                                        class: "text-body-2",
                                        style: { "color": "#888" }
                                      }, "Reunión General")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    class: "text-center pa-3",
                                    elevation: "0",
                                    style: { "background-color": "white", "border": "1px solid #e0e0e0" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h3", {
                                        class: "text-h5 font-weight-light mb-4",
                                        style: { "color": "#041845" }
                                      }, "Miércoles"),
                                      createVNode("p", {
                                        class: "text-h6 mb-2",
                                        style: { "color": "#555" }
                                      }, "8:00 PM"),
                                      createVNode("p", {
                                        class: "text-body-2",
                                        style: { "color": "#888" }
                                      }, "Reunión General")
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
                  }),
                  createVNode(VContainer, {
                    id: "ubicacion",
                    class: "py-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", {
                                class: "text-overline mb-2",
                                style: { "color": "#666", "letter-spacing": "2px" }
                              }, "ENCÚENTRANOS"),
                              createVNode("h2", {
                                class: "text-h3 font-weight-light",
                                style: { "color": "#041845" }
                              }, "Ubicación")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "5"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "pa-4" }, [
                                createVNode("h3", {
                                  class: "text-h5 font-weight-light mb-1",
                                  style: { "color": "#041845" }
                                }, "Iglesia Avivamiento Monterrey"),
                                createVNode("div", { class: "mb-6" }, [
                                  createVNode("p", {
                                    class: "text-overline mb-2",
                                    style: { "color": "#888" }
                                  }, "DIRECCIÓN"),
                                  createVNode("p", {
                                    class: "text-body-1",
                                    style: { "color": "#555" }
                                  }, " Av. Santo Domingo #215, Col. Mezquital, Apodaca, México ")
                                ]),
                                createVNode("div", { class: "mb-6" }, [
                                  createVNode("p", {
                                    class: "text-overline mb-2",
                                    style: { "color": "#888" }
                                  }, "TELÉFONO"),
                                  createVNode("p", { class: "text-body-1" }, [
                                    createVNode("a", {
                                      href: "tel:+528111651800",
                                      class: "text-decoration-none",
                                      style: { "color": "#041845" }
                                    }, " +52 (81) 1165-1800 ")
                                  ])
                                ]),
                                createVNode("div", { class: "mb-8" }, [
                                  createVNode("p", {
                                    class: "text-overline mb-2",
                                    style: { "color": "#888" }
                                  }, "EMAIL"),
                                  createVNode("p", { class: "text-body-1" }, [
                                    createVNode("a", {
                                      href: "mailto:info@avivamientomty.com",
                                      class: "text-decoration-none",
                                      style: { "color": "#041845" }
                                    }, " elavivamientomonterrey@hotmail.com ")
                                  ])
                                ]),
                                createVNode(VBtn, {
                                  href: "https://maps.app.goo.gl/g7wBuXmhKL114A657",
                                  target: "_blank",
                                  color: "#041845",
                                  variant: "flat",
                                  size: "large",
                                  block: "",
                                  class: "mt-4",
                                  style: { "text-transform": "none" }
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Abrir en Google Maps ")
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "7"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCard, {
                                elevation: "0",
                                height: "100%",
                                style: { "border": "1px solid #e0e0e0" }
                              }, {
                                default: withCtx(() => [
                                  createVNode("iframe", {
                                    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx",
                                    width: "100%",
                                    height: "100%",
                                    style: { "border": "0", "min-height": "500px" },
                                    allowfullscreen: "",
                                    loading: "lazy",
                                    referrerpolicy: "no-referrer-when-downgrade"
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
                  }),
                  createVNode(VContainer, {
                    fluid: "",
                    id: "contacto",
                    class: "py-4",
                    style: { "background-color": "#041845" }
                  }, {
                    default: withCtx(() => [
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VRow, { justify: "center" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "8",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", {
                                    class: "text-overline mb-4",
                                    style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                                  }, "BIENVENIDOS"),
                                  createVNode("h2", {
                                    class: "text-h3 font-weight-light mb-6",
                                    style: { "color": "white" }
                                  }, " Únete a Nuestra Comunidad "),
                                  createVNode("p", {
                                    class: "text-h6 font-weight-light mb-8",
                                    style: { "color": "rgba(255,255,255,0.8)" }
                                  }, " Te invitamos a ser parte de nuestra familia en Cristo "),
                                  createVNode("div", { class: "d-flex flex-wrap justify-center gap-4" }, [
                                    createVNode(VBtn, {
                                      onClick: ($event) => scrollToSection("horarios"),
                                      variant: "outlined",
                                      size: "x-large",
                                      color: "white",
                                      style: { "text-transform": "none", "cursor": "pointer" },
                                      class: "px-8"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Ver Horarios ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(VBtn, {
                                      onClick: ($event) => scrollToSection("ubicacion"),
                                      variant: "flat",
                                      size: "x-large",
                                      color: "white",
                                      style: { "text-transform": "none", "color": "#041845", "cursor": "pointer" },
                                      class: "px-8"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Cómo Llegar ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
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
              }),
              createVNode(VFooter, {
                style: { "background-color": "#1a1a1a", "color": "white" },
                class: "py-4"
              }, {
                default: withCtx(() => [
                  createVNode(VContainer, null, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "4",
                            class: "text-center text-md-left mb-6 mb-md-0"
                          }, {
                            default: withCtx(() => [
                              createVNode("h3", {
                                class: "text-h5 font-weight-light mb-4",
                                style: { "color": "white" }
                              }, "Avivamiento Monterrey"),
                              createVNode("p", {
                                class: "text-body-2",
                                style: { "color": "rgba(255,255,255,0.7)", "line-height": "1.8" }
                              }, [
                                createTextVNode(" Una iglesia cristiana comprometida"),
                                createVNode("br"),
                                createTextVNode(" con la comunidad de Monterrey ")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "4",
                            class: "text-center mb-6 mb-md-0"
                          }, {
                            default: withCtx(() => [
                              createVNode("h3", {
                                class: "text-overline mb-4",
                                style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                              }, "SÍGUENOS"),
                              createVNode("div", { class: "d-flex justify-center" }, [
                                createVNode(VBtn, {
                                  icon: "",
                                  variant: "text",
                                  href: "https://www.facebook.com/IglesiaAvivamientoMonterrey",
                                  target: "_blank",
                                  class: "mx-2",
                                  style: { "color": "rgba(255,255,255,0.7)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { size: "28" }, {
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
                                  class: "mx-2",
                                  style: { "color": "rgba(255,255,255,0.7)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { size: "28" }, {
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
                                  class: "mx-2",
                                  style: { "color": "rgba(255,255,255,0.7)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { size: "28" }, {
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
                                  class: "mx-2",
                                  style: { "color": "rgba(255,255,255,0.7)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { size: "28" }, {
                                      default: withCtx(() => [
                                        createTextVNode("mdi-spotify")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "4",
                            class: "text-center text-md-right"
                          }, {
                            default: withCtx(() => [
                              createVNode("h3", {
                                class: "text-overline mb-4",
                                style: { "color": "rgba(255,255,255,0.7)", "letter-spacing": "2px" }
                              }, "CONTACTO"),
                              createVNode("p", {
                                class: "text-body-2 mb-2",
                                style: { "color": "rgba(255,255,255,0.7)" }
                              }, " +52 (81) 1165-1800 "),
                              createVNode("p", {
                                class: "text-body-2",
                                style: { "color": "rgba(255,255,255,0.7)" }
                              }, " info@avivamientomty.com ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VDivider, {
                        class: "my-6",
                        style: { "border-color": "rgba(255,255,255,0.1)" }
                      }),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", {
                                class: "text-body-2",
                                style: { "color": "rgba(255,255,255,0.5)" }
                              }, " © " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " Avivamiento Monterrey - Todos los derechos reservados ", 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/land.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const land = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4934762d"]]);

export { land as default };
//# sourceMappingURL=land-2lLLEJ4w.mjs.map
