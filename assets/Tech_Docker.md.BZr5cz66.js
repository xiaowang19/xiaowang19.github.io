import{_ as a,c as i,a2 as e,o as r}from"./chunks/framework.Bt53DRYp.js";const c=JSON.parse('{"title":"文档 & 教程","description":"","frontmatter":{},"headers":[],"relativePath":"Tech/Docker.md","filePath":"Tech/Docker.md"}'),t={name:"Tech/Docker.md"};function n(l,s,h,o,p,k){return r(),i("div",null,s[0]||(s[0]=[e(`<p>Docker</p><hr><p>@ Copyright</p><ul><li>作者 = xiaowang (<a href="mailto:ibug119@qq.com" target="_blank" rel="noreferrer">ibug119@qq.com</a>)</li><li>时间 = 2019-07-11 15:45:24</li><li>链接 = <a href="http://onlookee.com" target="_blank" rel="noreferrer">http://onlookee.com</a></li><li>版本 = 1.0</li></ul><h1 id="文档-教程" tabindex="-1">文档 &amp; 教程 <a class="header-anchor" href="#文档-教程" aria-label="Permalink to &quot;文档 &amp; 教程&quot;">​</a></h1><ul><li><a href="https://www.docker.com/" target="_blank" rel="noreferrer">Enterprise Container Platform - Docker</a></li><li><a href="https://my.oschina.net/u/4006148/blog/3164071" target="_blank" rel="noreferrer">看完这篇，Docker你就入门了</a></li><li><a href="https://github.com/collabnix/dockerlabs" target="_blank" rel="noreferrer">（英文）适合所有阶段开发者的 Docker 教程。该教程的内容分为初、中、高三个级别，适合所有阶段的 Docker。内含 500 个动手实验，以及 Docker 和 Docker Compose 小抄</a></li></ul><ul><li><a href="https://www.bilibili.com/video/BV14s4y1i7Vf/" target="_blank" rel="noreferrer">【GeekHour】30分钟Docker入门教程（2023-06-02）</a></li><li><a href="https://www.bilibili.com/video/BV11L411g7U1/" target="_blank" rel="noreferrer">Docker 1小时快速上手教程，无废话纯干货（2021-10-28）</a><ul><li><a href="https://docker.easydoc.net" target="_blank" rel="noreferrer">课件</a></li></ul></li><li><a href="https://www.bilibili.com/video/BV1Kg411D78F/" target="_blank" rel="noreferrer">docker简介（2022-08-27）</a><ul><li><a href="https://www.yuque.com/wukong-zorrm/xwas40/" target="_blank" rel="noreferrer">课件地址</a></li></ul></li></ul><h1 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h1><h2 id="windows" tabindex="-1">Windows <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows&quot;">​</a></h2><ul><li><a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noreferrer">Docker Desktop for Mac and Windows - Docker</a></li></ul><p>问题：</p><ul><li>无法选择安装路径</li><li>需要“Hyper-V”</li></ul><h3 id="hyper-v" tabindex="-1">Hyper-V <a class="header-anchor" href="#hyper-v" aria-label="Permalink to &quot;Hyper-V&quot;">​</a></h3><p>需要启用“Hyper-V”，但这会造成 VMware Player 无法正常启动系统，而。。。实在蛋疼</p><p>以下貌似有解决方案</p><ul><li><a href="https://blog.nediiii.com/windows-docker-in-vmware/" target="_blank" rel="noreferrer">Windows 下 Docker 与 VMware 共存</a></li><li><a href="https://www.cnblogs.com/stulzq/p/9064828.html" target="_blank" rel="noreferrer">Docker for Windows 使用 VMware WorkStation</a></li><li><a href="https://blog.csdn.net/qq_40374604/article/details/83095410" target="_blank" rel="noreferrer">Docker 和 vmware 共存工作</a></li></ul><p>可以考虑在服务器上安装。。。</p><h2 id="容器类型" tabindex="-1">容器类型 <a class="header-anchor" href="#容器类型" aria-label="Permalink to &quot;容器类型&quot;">​</a></h2><p>Use Windows containers instead of Linux containers (this can be changed after installation)</p><p>默认吧，不勾选</p><p>Windows Container 只能运行 Windows应用程序（至少现在是这样）</p><h2 id="ubuntu" tabindex="-1">Ubuntu <a class="header-anchor" href="#ubuntu" aria-label="Permalink to &quot;Ubuntu&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -qO-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://get.docker.com/</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;&#39;&#39;或&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://get.docker.com</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-docker.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get-docker.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;&#39;&#39;启动 docker 后台服务&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;&#39;&#39;添加自动启动&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;&#39;&#39;取消自动启动&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> disable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;&#39;&#39;测试运行 hello-world&#39;&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello-world</span></span></code></pre></div><h3 id="non-root" tabindex="-1">non-root <a class="header-anchor" href="#non-root" aria-label="Permalink to &quot;non-root&quot;">​</a></h3><p>If you would like to use Docker as a non-root user, you should now consider adding your user to the &quot;docker&quot; group with something like:</p><pre><code>sudo usermod -aG docker xiaowang
</code></pre><p>以非 root 运行，以后再研究</p><h2 id="镜像加速" tabindex="-1">镜像加速 <a class="header-anchor" href="#镜像加速" aria-label="Permalink to &quot;镜像加速&quot;">​</a></h2><p>鉴于国内网络问题，后续拉取 Docker 镜像十分缓慢，我们可以需要配置加速器来解决，我使用的是网易的镜像地址：<a href="http://hub-mirror.c.163.com" target="_blank" rel="noreferrer">http://hub-mirror.c.163.com</a>。</p><p>新版的 Docker 使用 /etc/docker/daemon.json（Linux） 或者 %programdata%\\docker\\config\\daemon.json（Windows） 来配置 Daemon。</p><p>请在该配置文件中加入（没有该文件的话，请先建一个）：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/docker/daemon.json</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">~~</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;registry-mirrors&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://registry.docker-cn.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://hub-mirror.c.163.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">~~</span></span></code></pre></div><h1 id="工具" tabindex="-1">工具 <a class="header-anchor" href="#工具" aria-label="Permalink to &quot;工具&quot;">​</a></h1><ul><li><a href="https://my.oschina.net/u/200350/blog/3125682" target="_blank" rel="noreferrer">Docker 图形化页面管理工具使用</a></li><li><a href="https://www.oschina.net/p/play-with-docker" target="_blank" rel="noreferrer">Play with Docker - 在线 Docker 学习平台</a></li><li><a href="https://www.oschina.net/p/podman-desktop" target="_blank" rel="noreferrer">Podman Desktop - 桌面容器管理程序</a></li></ul><h1 id="jupyter" tabindex="-1">Jupyter <a class="header-anchor" href="#jupyter" aria-label="Permalink to &quot;Jupyter&quot;">​</a></h1><p><a href="https://my.oschina.net/u/3371661/blog/3072789" target="_blank" rel="noreferrer">Jupyter+Docker玩转《Python数据分析基础》</a></p><p>安装 <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noreferrer">Docker Desktop for Mac and Windows - Docker</a></p><p>运行jupyter/scipy-notebook，打开命令提示符（以下同），执行以下命令：</p><pre><code>docker pull jupyter/scipy-notebook
</code></pre><p>经过漫长的等待 ...</p><p>运行 jupyter/scipy-notebook</p><pre><code>docker run -it --rm -p 8888:8888 jupyter/scipy-notebook
</code></pre><p>打开浏览器，访问 <a href="http://127.0.0.1:8888/?token=xxxxxxxx" target="_blank" rel="noreferrer">http://127.0.0.1:8888/?token=xxxxxxxx</a></p>`,43)]))}const F=a(t,[["render",n]]);export{c as __pageData,F as default};
