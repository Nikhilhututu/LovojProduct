(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,n,t){e.exports=t(36)},32:function(e,n,t){},36:function(e,n,t){"use strict";t.r(n);var i,a,r,o,s=t(7),l=t.n(s),d=t(18),c=t.n(d),h=(t(32),t(11)),m=t(9),u=t(12),g=t(1),p=t(3),f=t(2),v=t(23),b=t(19),w=function(){return a=Object(s.useRef)(null),l.a.useEffect(function(){a.current||(r=new L)},[]),l.a.createElement(y,null,l.a.createElement("div",{className:"loader_container",id:"loader"},l.a.createElement("div",{className:"lds-dual-ring"})),l.a.createElement("div",{className:"three_container",id:"3d-container"}))},L=function(){function e(){Object(g.a)(this,e),a.current=document.getElementById("3d-container"),this.scene=null,this.camera=null,this.render=null,this.textureLoader=null,this.glbLoader=null,this.dirLight=null,this.hemiSphereLight=null,this.orbitController=null,this.canvasW=0,this.canvasH=0,this.modelRoot=null,this.shirt={model:"",texture:""},this.trouser={model:"",texture:""},this.male={model:"",texture:""},this.init()}return Object(p.a)(e,[{key:"init",value:function(){var e=this;this.canvasW=a.current.clientWidth,this.canvasH=a.current.clientHeight,this.scene=new f.fb("shirt_scene"),this.camera=new f.V(60,this.canvasW/this.canvasH,.1,1e3),this.camera.position.set(0,3.5,3.5),this.render=new f.sb({alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.render.outputColorSpace=f.eb,this.render.setPixelRatio(window.devicePixelRatio),this.render.setClearColor(0,0),this.render.setSize(this.canvasW,this.canvasH),a.current.appendChild(this.render.domElement),this.initLight(),this.loadAsset(),this.initOrbitController(),this.render.setAnimationLoop(function(){return e.renderScene()}),window.addEventListener("resize",function(){e.resize()})}},{key:"initLight",value:function(){this.dirLight=new f.h(16777215,.5),this.dirLight.color=new f.g(16777215),this.dirLight.position.set(0,1,5),this.dirLight.shadow.mapSize.width=512,this.dirLight.shadow.mapSize.height=512,this.dirLight.shadow.camera.near=.1,this.dirLight.shadow.camera.far=1e3,this.scene.add(this.dirLight),this.dirLight2=new f.h(16777215,1),this.dirLight2.color=new f.g(16711680),this.dirLight2.position.set(0,1,-5),this.dirLight2.shadow.mapSize.width=512,this.dirLight2.shadow.mapSize.height=512,this.dirLight2.shadow.camera.near=.1,this.dirLight2.shadow.camera.far=1e3,this.scene.add(this.dirLight2),this.hemiSphereLight=new f.n(16777215,16777215,.25),this.hemiSphereLight.position.set(0,10,0),this.scene.add(this.hemiSphereLight)}},{key:"initOrbitController",value:function(){}},{key:"renderScene",value:function(){this.render.render(this.scene,this.camera)}},{key:"resize",value:function(){this.canvasW=a.current.clientWidth,this.canvasH=a.current.clientHeight,this.camera.aspect=this.canvasW/this.canvasH,this.camera.updateProjectionMatrix(),this.render.setSize(this.canvasW,this.canvasH)}},{key:"loadAsset",value:function(){var e=this;this.loadingManager=new f.G,this.modelRoot=new f.T,this.glbLoader=new v.a(this.loadingManager),this.dracoLoader=new b.a(this.loadingManager),this.dracoLoader.setDecoderPath("./draco/gltf/"),this.glbLoader.setDRACOLoader(this.dracoLoader),this.textureLoader=new f.lb(this.loadingManager);var n=new f.W(.75,.75,32,32);this.maleMesh=new f.K(n),this.maleMesh.name="male_pos";var t=this.textureLoader.load("3dmodel/body_images/front_face.png");t.colorSpace=f.eb,t.wrapS=f.db,t.wrapT=f.db,t.magFilter=f.P,t.minFilter=f.P;var i=new f.L({map:t});i.alphaTest=!0,this.maleMesh.material=i,this.maleMesh.position.set(0,3.84,-.01),this.scene.add(this.maleMesh);this.glbLoader.load("3dmodel/male/scene.glb",function(n){e.male.model=n.scene,e.modelRoot.add(e.male.model),e.male.model.scale.set(.0176,.0176,.0176)}),this.glbLoader.load("3dmodel/male/shirt.glb",function(n){e.shirt.model=n.scene,e.shirt.model.scale.set(.0176,.0176,.0176),e.modelRoot.add(e.shirt.model),e.shirt.model.traverse(function(n){n.isMesh&&e.updateTexture("3dmodel/body_images/texture.jpg")})}),this.glbLoader.load("3dmodel/male/trouser.glb",function(n){e.trouser.model=n.scene,e.trouser.model.scale.set(.0176,.0176,.0176),e.modelRoot.add(e.trouser.model),e.trouser.model.traverse(function(e){e.isMesh&&(e.material.dispose(),e.material.needsUpdate=!0,e.material=new f.L,e.material.color=new f.g(0))}),e.scene.add(e.modelRoot)}),this.scene.add(this.modelRoot),this.modelRoot.rotation.y=0,this.modelRoot.position.y=.8,this.camera.lookAt(new f.qb(0,2.5,0));var a={x:0,y:0,z:0,val:.01};document.addEventListener("keydown",function(e){switch(e.key){case"ArrowLeft":a.x-=a.val;break;case"ArrowRight":a.x+=a.val;break;case"ArrowUp":a.y+=a.val;break;case"ArrowDown":a.y-=a.val}console.log("!!! pos!! ",a)}),this.loadingManager.onStart=function(e,n,t){document.getElementById("loader").style.display="flex"},this.loadingManager.onLoad=function(){document.getElementById("loader").style.display="none"}}},{key:"changeView",value:function(e){var n;switch(e){case 0:n=this.textureLoader.load("3dmodel/body_images/front_face.png"),this.modelRoot.rotation.y=0;break;case 1:n=this.textureLoader.load("3dmodel/body_images/back_face.png"),this.modelRoot.rotation.y=Math.PI;break;case 2:n=this.textureLoader.load("3dmodel/body_images/side_face.png"),this.modelRoot.rotation.y=Math.PI/3}this.maleMesh.material.needsUpdate=!0,n.colorSpace=f.eb,n.wrapS=f.db,n.wrapT=f.db,n.magFilter=f.P,n.minFilter=f.P,this.maleMesh.material.map=n}},{key:"changeShirt",value:function(e){this.shirtRoot.traverse(function(n){n.isMesh&&(n.name.includes("full_sleeves")&&(n.visible=e),n.name.includes("short_sleeves")&&(n.visible=!e),n.name.includes("cuffs")&&(n.visible=e))})}},{key:"changeCollar",value:function(e){this.shirtRoot.traverse(function(n){n.isMesh&&(n.name.includes("normal_collar")&&(n.visible=e),n.name.includes("stand_collar")&&(n.visible=!e))})}},{key:"updateTexture",value:function(e){var n=this;console.log(e);var t=this.textureLoader.load(e);this.shirt.model.traverse(function(e){e.isMesh&&n.applyTexture(e,t)})}},{key:"changeCollarTexture",value:function(e){var n=this,t=this.textureLoader.load(e);t.colorSpace=f.eb,t.wrapS=f.db,t.wrapT=f.db,t.magFilter=f.P,t.minFilter=f.P,t.repeat.set(1,1),this.shirtRoot.traverse(function(e){e.isMesh&&e.name.includes("collar")&&n.applyTexture(e,t)})}},{key:"changeButtonColor",value:function(e,n){this.shirtRoot.traverse(function(t){t.isMesh&&(t.name.includes("button")&&"button"===n?(t.material.color=new f.g(e),t.material.metalness=0,t.material.roughness=1):t.name.includes("thread")&&"thread"===n&&(t.material.color=new f.g(e),t.material.metalness=0,t.material.roughness=1))})}},{key:"applyTexture",value:function(e,n){n&&(n.colorSpace=f.eb,n.wrapS=f.db,n.wrapT=f.db,n.magFilter=f.P,n.minFilter=f.P,n.repeat.set(.002,.002)),e.material&&e.material.dispose(),e.material=new f.L,e.material.map=n,e.material.map.flipY=!1,e.material.needsUpdate=!0}}]),e}(),y=u.a.section(i||(i=Object(h.a)(['\n   width: 100%;\n   height: 100vh;\n   z-index: -1;\n   position: fixed;\n   background-color: #9BA4B5;\n   .three_container{\n      width: 100%;\n      height: 100%;\n   }\n   .loader_container{\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      background-color: rgba(0,0,0,.9);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n   }\n   .lds-dual-ring{\n      display: inline-block;\n      width: 5rem;\n      height: 5rem;\n    }\n    .lds-dual-ring:after {\n        content: " ";\n        display: block;\n        width: 2rem;\n        height: 2rem;\n        margin: 8px;\n        border-radius: 50%;\n        border: 2px solid #fff;\n        border-color: #fff transparent #fff transparent;\n        animation: lds-dual-ring 1.2s linear infinite;\n    }\n    @keyframes lds-dual-ring {\n        0% {\n            transform: rotate(0deg);\n        }\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n\n']))),x=function(){var e=l.a.useState(!0),n=Object(m.a)(e,2),t=(n[0],n[1],l.a.useState(0)),i=Object(m.a)(t,2),a=(i[0],i[1],l.a.useState(!0)),o=Object(m.a)(a,2),s=(o[0],o[1],function(e){r.changeView(e)});return l.a.createElement(k,null,l.a.createElement("div",{className:"view_container"},l.a.createElement("div",{onClick:function(){s(0)}},"Front"),l.a.createElement("div",{onClick:function(){s(1)}},"back"),l.a.createElement("div",{onClick:function(){s(2)}},"side")))},k=u.a.section(o||(o=Object(h.a)(["\n    /* position: absolute; */\n    width: 100%;\n    display: flex;\n    flex-direction: row-reverse;\n    pointer-events: none;\n    .view_container{\n         margin: 1rem;\n         display: flex;\n         gap: 1rem;\n         text-transform: capitalize;\n         pointer-events: all;\n         cursor: pointer;\n         user-select: none;\n         div{\n             padding: .25rem 1rem;\n             border: 1px solid #213555;\n             border-radius: 1rem;\n             background-color: #DDE6ED;\n             &:active{\n                transform: scale(.9);\n             }\n         }\n    }\n    .container{\n        pointer-events: all;\n        display: flex;\n        gap: 1rem;\n        padding: 1rem;\n        user-select: none;\n        flex-direction: column;\n        .img-icons{\n            width: 4rem;\n            cursor: pointer;\n            /* outline: #213555 solid; */\n            img{\n                padding: 0%;\n                margin: 0%;\n                width: 100%;\n                text-align: center;\n            }\n        }\n        .active{\n            outline: aliceblue solid;\n        }\n    }\n    .container2{\n        display: flex;\n        flex-direction: column;\n        padding: 1rem;\n        margin-top: 1.5rem;\n        pointer-events: all;\n        gap: 2rem;\n        .file-input-container{\n            position: absolute;     \n            right: 6rem;\n            top: 2rem;\n            .file-input{\n                width: 0;\n                height: 0;\n                padding: 0%;\n                margin: 0%;\n                overflow: hidden;\n            }\n            transition: all linear .3s;\n        }\n        .color-input-container{\n            position: absolute;     \n            right: 6rem;\n            top: 2rem;\n            display: none;\n            .color-input{\n                width: 4rem;\n                height: 2rem;\n                margin-right: .5rem;\n            }\n            transition: all linear .3s;\n        }\n        .input-label{\n            padding: .5rem 1.5rem;\n            font-size: 1.2rem;\n            user-select: none;\n            background-color:#213555;\n            color: aliceblue;\n            border-radius: 10px;\n            cursor: pointer;\n            display: inline-block;\n            text-transform: capitalize;\n            transition: all .4s;\n            outline: 1px solid #DDE6ED;\n            &:hover{\n                background-color:#DDE6ED;\n                color:#213555;\n            }\n        }\n    }\n"]))),E=function(){return console.log("##########"),l.a.createElement(l.a.Fragment,null,l.a.createElement(w,null),l.a.createElement(x,null))},S=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,38)).then(function(n){var t=n.getCLS,i=n.getFID,a=n.getFCP,r=n.getLCP,o=n.getTTFB;t(e),i(e),a(e),r(e),o(e)})};c.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(E,null))),S()}},[[24,1,2]]]);
//# sourceMappingURL=main.8ddf0b17.chunk.js.map