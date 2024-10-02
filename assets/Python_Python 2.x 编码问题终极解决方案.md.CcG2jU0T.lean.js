import{_ as s,c as a,a2 as p,o as e}from"./chunks/framework.Bt53DRYp.js";const l="/assets/PythonEncoding.DJojgzq1.png",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Python/Python 2.x 编码问题终极解决方案.md","filePath":"Python/Python 2.x 编码问题终极解决方案.md"}'),i={name:"Python/Python 2.x 编码问题终极解决方案.md"};function t(c,n,o,r,d,h){return e(),a("div",null,n[0]||(n[0]=[p('<p>% Python 2.x 编码问题终极解决方案</p><p>Python</p><hr><p>#::Copyright</p><ul><li>作者 = xiaowang (<a href="mailto:xer345@126.com" target="_blank" rel="noreferrer">xer345@126.com</a>)</li><li>日期 = 2017-04-20</li><li>时间 = 2017-04-16 23:17:51 / 2017-04-20 16:58:41</li><li>链接 = <a href="http://onlookee.com/?c=Article&amp;a=view&amp;id=11" target="_blank" rel="noreferrer">Python 2.x 编码问题终极解决方案</a></li><li>版本 = 1.0</li><li>关于 = <a href="http://onlookee.com/" target="_blank" rel="noreferrer">ONLOOKEE.COM</a> 一直在分享有价值的软件/应用 、Python经验。</li></ul><p>#::文章信息</p><ul><li>类别 = Python</li><li>平台 = Windows,Mac,Linux</li><li>官网 = <a href="https://www.python.org/" target="_blank" rel="noreferrer">Welcome to Python.org</a></li></ul><p>#::截图照片</p><ul><li><img src="'+l+`" alt="主界面"></li></ul><p>#::文章内容</p><ul><li><a href="#重要概念">重要概念</a></li><li><a href="#开发步骤">开发步骤</a><ul><li><a href="#使用-utf-8-编码">1. 使用 utf-8 编码</a></li><li><a href="#统一使用-unicode">2. 统一使用 unicode</a></li><li><a href="#python-编程环境编码">3. Python 编程环境编码</a></li><li><a href="#输入输出编码">4. 输入输出编码</a></li><li><a href="#利用-chardet-检测编码">5. 利用 chardet 检测编码</a></li><li><a href="#利用-codecs-模块进行文件读写">6. 利用 codecs 模块进行文件读写</a></li><li><a href="#mysql-使用-utf8-或-utf8mb4-字符集">7. MySQL 使用 utf8 或 utf8mb4 字符集</a></li></ul></li><li><a href="#python-编码初步认识">Python 编码初步认识</a></li></ul><p>Python 是一门优美简单、功能强大的动态语言。在刚刚接触这门语言时，我们会被其优美的格式、简洁的语法和无穷无尽的类库所震撼。然而，在真正将 Python 应用到实际的项目中，你会遇到一些无法避免的问题，其中之一就是编码问题。</p><p>若是在 Linux 进行开发测试，也许很少会遇到编码问题。但若是在 Windows 下进行开发测试，则遇到编码问题的机率极大。对于使用 Windows 进行开发的同学，很可能因为编码问题而放弃了 Python。即使是使用 Linux 的同学，你也希望你所写的程序是真正跨平台的，那么编码问题也是无法回避的。</p><h2 id="重要概念" tabindex="-1">重要概念 <a class="header-anchor" href="#重要概念" aria-label="Permalink to &quot;重要概念&quot;">​</a></h2><p>Python 的字符串有 str 和 unicode 的区别，str 和 unicode 都是 basestring 子类</p><ol><li>str 可以看作是 unicode 字符串经过某种编码后的字节组成的数组；</li><li>unicode 是真正意义上的字符串；</li><li>通过 encode 可以将 unicode 类型编码为 str 类型；</li><li>通过 decode 可以将 str 类型解码为 unicode 类型；</li><li>Python 会隐式地进行编码、解码，默认采用 ascii；</li><li>所有的编码、解码错误都是由于所选的编码、解码方式无法表示某些字符造成的；</li></ol><h2 id="开发步骤" tabindex="-1">开发步骤 <a class="header-anchor" href="#开发步骤" aria-label="Permalink to &quot;开发步骤&quot;">​</a></h2><blockquote><p>统一使用 utf-8 编码 统一使用 unicode</p></blockquote><h3 id="_1-使用-utf-8-编码" tabindex="-1">1. 使用 utf-8 编码 <a class="header-anchor" href="#_1-使用-utf-8-编码" aria-label="Permalink to &quot;1. 使用 utf-8 编码&quot;">​</a></h3><p>每个文件第一行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#encoding=utf-8</span></span></code></pre></div><h3 id="_2-统一使用-unicode" tabindex="-1">2. 统一使用 unicode <a class="header-anchor" href="#_2-统一使用-unicode" aria-label="Permalink to &quot;2. 统一使用 unicode&quot;">​</a></h3><p>在导入其他库之前</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from __future__ import unicode_literals</span></span></code></pre></div><p>这样，所有非输入（获取）的字符串默认为 unicode 类型。</p><h3 id="_3-python-编程环境编码" tabindex="-1">3. Python 编程环境编码 <a class="header-anchor" href="#_3-python-编程环境编码" aria-label="Permalink to &quot;3. Python 编程环境编码&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import sys</span></span>
<span class="line"><span>reload(sys)</span></span>
<span class="line"><span>sys.setdefaultencoding(&#39;utf8&#39;)</span></span></code></pre></div><h3 id="_4-输入输出编码" tabindex="-1">4. 输入输出编码 <a class="header-anchor" href="#_4-输入输出编码" aria-label="Permalink to &quot;4. 输入输出编码&quot;">​</a></h3><p>非英文或多字节字符系统，又非采用 utf-8 编码系统。可使用下面的方式获取输入与输出字符编码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>print &#39;输入编码 = &#39;, sys.stdin.encoding</span></span>
<span class="line"><span>print &#39;输出编码 = &#39;, sys.stdout.encoding</span></span></code></pre></div><h3 id="_5-利用-chardet-检测编码" tabindex="-1">5. 利用 chardet 检测编码 <a class="header-anchor" href="#_5-利用-chardet-检测编码" aria-label="Permalink to &quot;5. 利用 chardet 检测编码&quot;">​</a></h3><p>当不清楚字符的编码时，可以使用 chardet 进行编码检测</p><p>chardet.detect(str) : 参数只能是 <strong>str</strong> 类型，不能是 unicode 类型</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from chardet.universaldetector import UniversalDetector</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>检测字符串编码</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>def detect_encoding(content):</span></span>
<span class="line"><span>    detector = UniversalDetector()</span></span>
<span class="line"><span>    contentlist = content.split()</span></span>
<span class="line"><span>    for line in contentlist:</span></span>
<span class="line"><span>        detector.feed(line)</span></span>
<span class="line"><span>        if detector.done:</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>    detector.close()</span></span>
<span class="line"><span>    return detector.result[&#39;encoding&#39;].lower()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if not isinstance(line, unicode):</span></span>
<span class="line"><span>    print &#39;line 的编码 = &#39;, detect_encoding(line)</span></span></code></pre></div><h3 id="_6-利用-codecs-模块进行文件读写" tabindex="-1">6. 利用 codecs 模块进行文件读写 <a class="header-anchor" href="#_6-利用-codecs-模块进行文件读写" aria-label="Permalink to &quot;6. 利用 codecs 模块进行文件读写&quot;">​</a></h3><p>先用 chardet 检测出文件的编码，再利用 codecs 进行文件的读写</p><p>由于 chardet 有时候也会无法检测出文件的编码，或者，检测到的编码是错误的，此时可用异常捕获避免程序出错中断</p><p>如果 chhardet 无法检测出编码，此时可以进行编码猜测，中文系统：GB18030 &gt; GBK &gt; GB2312 &gt; ASCII</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#encoding=utf-8</span></span>
<span class="line"><span>from __future__ import unicode_literals</span></span>
<span class="line"><span>import chardet</span></span>
<span class="line"><span>import codecs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>检测文件编码</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>def file_get_encoding(filepath):</span></span>
<span class="line"><span>    detector = UniversalDetector()</span></span>
<span class="line"><span>    for line in open(filepath, &#39;rb&#39;):</span></span>
<span class="line"><span>        detector.feed(line)</span></span>
<span class="line"><span>        if detector.done:</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>    detector.close()</span></span>
<span class="line"><span>    return detector.result[&#39;encoding&#39;].upper()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>读文件</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>def file_get_contents(filepath):</span></span>
<span class="line"><span>    content = &#39;&#39;</span></span>
<span class="line"><span>    encoding = file_get_encoding(filepath)</span></span>
<span class="line"><span>    with codecs.open(filepath, &#39;r&#39;, encoding) as fh:</span></span>
<span class="line"><span>        content = fh.read()</span></span>
<span class="line"><span>    # return globals()[&#39;convert_to_unicode&#39;](content)</span></span>
<span class="line"><span>    return content</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>写文件</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>def file_put_contents(filepath, content, encoding=&#39;utf-8&#39;):</span></span>
<span class="line"><span>    filepath = os.path.realpath(filepath)</span></span>
<span class="line"><span>    dirpath  = os.path.dirname(filepath)</span></span>
<span class="line"><span>    if os.path.exists(dirpath) == False:os.makedirs(dirpath)</span></span>
<span class="line"><span>    with codecs.open(filepath, &#39;w&#39;, encoding) as fh:</span></span>
<span class="line"><span>        fh.write(content)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>try:</span></span>
<span class="line"><span>    content = file_get_contents(r&#39;/home/xiaowang/demo.txt&#39;)</span></span>
<span class="line"><span>    file_put_contents(r&#39;/home/xiaowang/demo.txt&#39;, &#39;写入测试&#39;)</span></span>
<span class="line"><span>except UnicodeDecodeError as e:</span></span>
<span class="line"><span>    print e.message</span></span></code></pre></div><h3 id="_7-mysql-使用-utf8-或-utf8mb4-字符集" tabindex="-1">7. MySQL 使用 utf8 或 utf8mb4 字符集 <a class="header-anchor" href="#_7-mysql-使用-utf8-或-utf8mb4-字符集" aria-label="Permalink to &quot;7. MySQL 使用 utf8 或 utf8mb4 字符集&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>try:</span></span>
<span class="line"><span>    import MySQLdb as mysql</span></span>
<span class="line"><span>except:</span></span>
<span class="line"><span>    import pymysql as mysql</span></span>
<span class="line"><span>conn = mysql.connect(</span></span>
<span class="line"><span>    host    = &#39;主机地址&#39;,</span></span>
<span class="line"><span>    port    = &#39;端口&#39;,</span></span>
<span class="line"><span>    user    = &#39;用户&#39;,</span></span>
<span class="line"><span>    passwd  = &#39;密码&#39;,</span></span>
<span class="line"><span>    db      = &#39;数据库名&#39;,</span></span>
<span class="line"><span>    charset = &#39;utf8&#39;)</span></span></code></pre></div><h2 id="python-编码初步认识" tabindex="-1">Python 编码初步认识 <a class="header-anchor" href="#python-编码初步认识" aria-label="Permalink to &quot;Python 编码初步认识&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python</span></span>
<span class="line"><span># -*- coding: utf-8 -*-   用来指定文件编码为 utf-8 的，如果不指定将会使用系统默认的编码方式</span></span>
<span class="line"><span>&#39;&#39;&#39;windows7 平台下测试&#39;&#39;&#39;</span></span>
<span class="line"><span>&#39;&#39;&#39;查看系统的隐式编码方式&#39;&#39;&#39;</span></span>
<span class="line"><span>import locale</span></span>
<span class="line"><span>print locale.getdefaultlocale()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>a = &#39;Test 测试&#39;</span></span>
<span class="line"><span>b = u&#39;Test 测试&#39;</span></span>
<span class="line"><span>&#39;&#39;&#39;str 是字节串，隐含了某种编码方式的字节码，由 unicode 经某种编码方式编码而来&#39;&#39;&#39;</span></span>
<span class="line"><span>print a, type(a)             # Test 娴嬭瘯 &amp;lt;type &#39;str&#39;&amp;gt;</span></span>
<span class="line"><span>&#39;&#39;&#39;这个才是字符串&#39;&#39;&#39;</span></span>
<span class="line"><span>print b, type(b)             # Test 测试 &amp;lt;type &#39;unicode&#39;&amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>我们可以将 &amp;lt;type &#39;unicode&#39;&amp;gt;看作是一系列字符组成的数组，数组的每一项是一个代码点，用来表示相应位置的字符.</span></span>
<span class="line"><span>所以对于 unicode 来说，其长度等于它包含的字符个数.(unicode 为万国码，也可以理解为中间码)</span></span>
<span class="line"><span>对 str 来说，其长度等于字节个数</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>print repr(a)               # &#39;Test \\xe6\\xb5\\x8b\\xe8\\xaf\\x95&#39;</span></span>
<span class="line"><span>print repr(b)               # u&#39;Test \\u6d4b\\u8bd5&#39;，\\u6d4b 表示&#39;测&#39;，\\u8bd5 表示&#39;试&#39;</span></span>
<span class="line"><span>print len(a)                # 11</span></span>
<span class="line"><span>print len(b)                # 7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;可以将 &amp;lt;type &#39;str&#39;&amp;gt; 看作是 unicode 字符串经过某种编码后的字节组成的数组.</span></span>
<span class="line"><span>数组的每一项是一个字节。所以对于 str 字符串来说，其长度等于编码后字节的长度。&#39;&#39;&#39;</span></span>
<span class="line"><span>print a                     # Test 娴嬭瘯</span></span>
<span class="line"><span>print bytearray(b, &#39;utf-8&#39;)  # Test 娴嬭瘯</span></span>
<span class="line"><span>print bytearray(b, &#39;gbk&#39;)    # Test 测试</span></span>
<span class="line"><span>print bytearray(b, &#39;cp936&#39;)  # Test 测试</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;解码，因为 str 类型是隐含有某种编码方式的字节码，此脚本指定为 utf-8，所以用 utf-8 解码&#39;&#39;&#39;</span></span>
<span class="line"><span>t = a.decode(&#39;utf-8&#39;)</span></span>
<span class="line"><span>print type(t), t, len(t)      # &amp;lt;type &#39;unicode&#39;&amp;gt; Test 测试 7</span></span>
<span class="line"><span>&#39;&#39;&#39;编码&#39;&#39;&#39;</span></span>
<span class="line"><span>g = t.encode(&#39;utf-8&#39;)</span></span>
<span class="line"><span>print type(g), g, len(g)      # &amp;lt;type &#39;str&#39;&amp;gt; Test 娴嬭瘯 11</span></span>
<span class="line"><span>g = t.encode(&#39;gbk&#39;)</span></span>
<span class="line"><span>print type(g), g, len(g)      # &amp;lt;type &#39;str&#39;&amp;gt; Test 测试 9</span></span>
<span class="line"><span>g = t.encode(&#39;cp936&#39;)</span></span>
<span class="line"><span>print type(g), g, len(g)      # &amp;lt;type &#39;str&#39;&amp;gt; Test 测试 9</span></span>
<span class="line"><span>&#39;&#39;&#39;用 ascii 编码/解码带有中文的 unicode 字符串时，会发生 UnicodeEncodeError/UnicodeDecodeError,</span></span>
<span class="line"><span>因为 ascii 只包含 127 个字符，无法表示中文.&#39;&#39;&#39;</span></span>
<span class="line"><span># g = t.encode(&#39;ascii&#39;)      # UnicodeEncodeError: &#39;ascii&#39; codec can&#39;t encode characters in position 5-6: ordinal not in range(128)</span></span>
<span class="line"><span># print type(g), g, len(g)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>隐藏的解码</span></span>
<span class="line"><span>因为 str 类型是隐含有某种编码方式的字节码，所以 Python 内部将其解码为 unicode 后，再和 unicode 类型进行 + 操作，最后返回的结果也是 unicode 类型。</span></span>
<span class="line"><span>解码过程是在幕后悄悄发生的，默认采用 ascii 来进行解码，Python 之所以采用 ascii，是因为 ascii 是最早的编码方式，是许多编码方式的子集。</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>try:</span></span>
<span class="line"><span>    t = u&#39;hello&#39; + &#39;world&#39;  # helloworld &amp;lt;type &#39;unicode&#39;&amp;gt;</span></span>
<span class="line"><span>    print t, type(t)</span></span>
<span class="line"><span>    print u&#39;hello&#39; + &#39;世界&#39;  # 等价于 u&#39;hello&#39; + &#39;世界&#39;.decode(&#39;ascii&#39;) ，用 ascii 解码中文会发生错误</span></span>
<span class="line"><span>except Exception, e:</span></span>
<span class="line"><span>    print e</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>隐藏的编码</span></span>
<span class="line"><span>Python 不只偷偷地用 ascii 来解码 str 类型的字节串，有时还会偷偷用 ascii 来编码 unicode 类型。如果函数或类等对象接收的是 str 类型的字符串，但传进去的是 unicode，Python2 就会使用 ascii 将其编码成 str 类型再做运算。</span></span>
<span class="line"><span>如果在终端进行输出，则不会抛出异常.因为 Python 会使用控制台的默认编码，而不是 ascii</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span>
<span class="line"><span>总结下本文的内容：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>str 可以看作是 unicode 字符串经过某种编码后的字节组成的数组</span></span>
<span class="line"><span>unicode 是真正意义上的字符串</span></span>
<span class="line"><span>通过 encode 可以将 unicode 类型编码为 str 类型</span></span>
<span class="line"><span>通过 decode 可以将 str 类型解码为 unicode 类型</span></span>
<span class="line"><span>Python 会隐式地进行编码、解码，默认采用 ascii</span></span>
<span class="line"><span>所有的编码、解码错误都是由于所选的编码、解码方式无法表示某些字符造成的</span></span>
<span class="line"><span>如果你明白了上面每句话的含义，那么应该能解决大部分编、解码引起的问题了。</span></span>
<span class="line"><span>&#39;&#39;&#39;</span></span></code></pre></div><p>#::相关下载</p><p><a href="http://onlookee.com/?c=Article&amp;a=download&amp;id=11" target="_blank" rel="noreferrer">下载地址 = http://onlookee.com/?c=Article&amp;a=download&amp;id=11</a></p><p>#::theEnd</p>`,46)]))}const f=s(i,[["render",t]]);export{g as __pageData,f as default};
