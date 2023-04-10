<script setup>
/// <reference path="../../../index.d.ts" />
import { defineAsyncComponent } from "vue";

// import SvgTreeLogin from '../../assets/tree-login.svg?component'
// import SvgTreeLoginUrl from "../../assets/tree-login.svg?url";
// import SvgTreeLoginRaw from "../../assets/tree-login.svg?raw";

const name = "tree-login";
const Async = defineAsyncComponent(() => import(`../../assets/${name}.svg`));
</script>

<template>
  HOLAAAAAAA
  <div id="component">
    <SvgTreeLogin />
  </div>

  <div id="url">
    {{ SvgTreeLoginUrl }}
  </div>

  <div id="raw">
    {{ SvgTreeLoginRaw }}
  </div>

</template>

