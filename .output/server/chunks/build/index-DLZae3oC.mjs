import { computed, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useHead } from './composables-C0E_lS2T.mjs';
import { V as VApp, a as VMain, b as VImg } from './VMain-u6qFTvOC.mjs';
import { h as useDisplay } from './server.mjs';
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

const _imports_0 = publicAssetsURL("/images/main.jpg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { mobile } = useDisplay();
    const isMobile = computed(() => mobile.value);
    useHead({
      title: "Avivamiento Monterrey"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: _imports_0,
                    height: isMobile.value ? "45vh" : "100vh",
                    cover: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VImg, {
                      src: _imports_0,
                      height: isMobile.value ? "45vh" : "100vh",
                      cover: ""
                    }, null, 8, ["height"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VMain, null, {
                default: withCtx(() => [
                  createVNode(VImg, {
                    src: _imports_0,
                    height: isMobile.value ? "45vh" : "100vh",
                    cover: ""
                  }, null, 8, ["height"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DLZae3oC.mjs.map
