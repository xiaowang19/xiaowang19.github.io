import{_ as s,c as n,a2 as e,o as p}from"./chunks/framework.Bt53DRYp.js";const o="/assets/PythonImport.B24mi2eq.png",y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Python/Python 类库引入机制.md","filePath":"Python/Python 类库引入机制.md"}'),t={name:"Python/Python 类库引入机制.md"};function l(i,a,r,c,m,h){return p(),n("div",null,a[0]||(a[0]=[e('<p>% Python 类库引入机制</p><p>Python</p><hr><p>#::Copyright</p><ul><li>作者 = xiaowang (<a href="mailto:xer345@126.com" target="_blank" rel="noreferrer">xer345@126.com</a>)</li><li>日期 = 2017-04-15</li><li>时间 = 2017-04-15 23:33:16 / 2017-04-20 16:58:40</li><li>链接 = <a href="http://onlookee.com/?c=Article&amp;a=view&amp;id=10" target="_blank" rel="noreferrer">Python 类库引入机制</a></li><li>版本 = 1.0</li><li>关于 = <a href="http://onlookee.com/" target="_blank" rel="noreferrer">ONLOOKEE.COM</a> 一直在分享有价值的软件/应用 、Python经验。</li></ul><p>#::文章信息</p><ul><li>类别 = Python</li><li>平台 = Windows,Mac,Linux</li><li>官网 = <a href="https://www.python.org/" target="_blank" rel="noreferrer">Welcome to Python.org</a></li></ul><p>#::截图照片</p><ul><li><img src="'+o+`" alt="主界面"></li></ul><p>#::文章内容</p><ul><li><a href="#python-类库引入机制">python-类库引入机制</a></li><li><a href="#python-的两种引入机制">python 的两种引入机制</a><ul><li><a href="#relativeimport">relativeimport</a></li><li><a href="#absolute-import">absolute-import</a></li></ul></li><li><a href="#一些实践经验">一些实践经验</a><ul><li><a href="#相对引用还是绝对引用">相对引用还是绝对引用</a></li><li><a href="#规范打包发布">规范打包发布</a></li><li><a href="#使用-virtualenv-管理包依赖">使用 virtualenv 管理包依赖</a></li></ul></li><li><a href="#python-import-实现">python import 实现</a><ul><li><a href="#查找-module-的过程">查找 module 的过程</a></li></ul></li><li><a href="#python-import-hooks">python import hooks</a><ul><li><a href="#import-hook-的重要性">import hook 的重要性</a></li><li><a href="#如何实现-import-hooks">如何实现 import hooks</a></li><li><a href="#一些-hook-示例">一些 hook 示例</a></li></ul></li></ul><p>Python 是一门优美简单、功能强大的动态语言。在刚刚接触这门语言时，我们会被其优美的格式、简洁的语法和无穷无尽的类库所震撼。在真正的将 python 应用到实际的项目中，你会遇到一些无法避免的问题。最让人困惑不解的问题有二类，一个 编码问题，另一个则是引用问题。</p><p>本文主要讨论关于 Python 中 import 的机制与实现、以及介绍一些有意思的 Python Hooks。</p><h2 id="python-类库引入机制" tabindex="-1">python-类库引入机制 <a class="header-anchor" href="#python-类库引入机制" aria-label="Permalink to &quot;python-类库引入机制&quot;">​</a></h2><p>首先，看一个简单的例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    目录结构如下：</span></span>
<span class="line"><span>    ├── __init__.py</span></span>
<span class="line"><span>    ├── main.py</span></span>
<span class="line"><span>    └── string.py</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    # main.py 内容如下</span></span>
<span class="line"><span>    import string</span></span>
<span class="line"><span>    print string.a</span></span>
<span class="line"><span>    # string.py 内容如下</span></span>
<span class="line"><span>    a = 2</span></span></code></pre></div><p>现在，考虑一下：</p><ol><li>当我们执行 main.py 的时候，会发生什么事情？</li><li>在 main.py 文件执行到<code>import string</code>的时候，解释器导入的 string 类库是当前文件夹下的 string.py 还是系统标准库的 string.py 呢？</li><li>如果明确的指明⾃己要引⼊的类库？</li></ol><p>为了搞清楚上面的问题，我们需要了解关于 Python 类库引入的机制。</p><h2 id="python-的两种引入机制" tabindex="-1">python 的两种引入机制 <a class="header-anchor" href="#python-的两种引入机制" aria-label="Permalink to &quot;python 的两种引入机制&quot;">​</a></h2><p>Python 提供了二种引入机制：</p><ol><li>relative import</li><li>absolute import</li></ol><h3 id="relativeimport" tabindex="-1">relativeimport <a class="header-anchor" href="#relativeimport" aria-label="Permalink to &quot;relativeimport&quot;">​</a></h3><p>也叫作相对引入，在 Python2.5 及之前是默认的引入方法。它的使用方法如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from .string import a</span></span>
<span class="line"><span>from ..string import a</span></span>
<span class="line"><span>from ...string import a</span></span></code></pre></div><p>这种引入方式使用一个点号来标识引入类库的精确位置。与 linux 的相对路径表示相似，一个点表示当前目录，每多一个点号则代表向上一层目录。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>├── __init__.py</span></span>
<span class="line"><span>├── foo.py</span></span>
<span class="line"><span>└── main.py</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span># foo.py</span></span>
<span class="line"><span>a = 2</span></span>
<span class="line"><span># main.py</span></span>
<span class="line"><span>print __name__</span></span>
<span class="line"><span>from .foo import a</span></span>
<span class="line"><span>print a</span></span></code></pre></div><p>相对引入，那么我们需要知道相对什么来引入。相对引入使用被引入文件的<code>__name__</code>属性来决定该文件在整个包结构的位置。那么如果文件的<code>__name__</code>没有包含任何包的信息，例如<code>__name__</code>被设置为了<code>__main__</code>，则认为其为‘top level script’，而不管该文件的位置，这个时候相对引入就没有引入的参考物。如上面的程序所示，当我们执行<code>python main.py</code>时，Python 解释器会抛出 ValueError: Attempted relative import in non-package 的异常。</p><p>为了解决这个问题，<a href="https://www.python.org/dev/peps/pep-0366/" target="_blank" rel="noreferrer">PEP 0366 – Main module explicit relative imports</a>提出了一个解决方案。允许用户使用<code>python -m ex2.main</code>的方式,来执行该文件。在这个方案下，引入了一个新的属性<code>__package__</code>。</p><pre><code>╭─liuchang@localhost  ~/Codes/pycon
╰─$ cat ex2/main.py
print __name__
print __package__
from .foo import a
print a
╭─liuchang@localhost  ~/Codes/pycon
╰─$ python -m ex2.main
__main__
ex2
2
</code></pre><h3 id="absolute-import" tabindex="-1">absolute-import <a class="header-anchor" href="#absolute-import" aria-label="Permalink to &quot;absolute-import&quot;">​</a></h3><p>absolute import 也叫作完全引入，非常类似于 Java 的引入进制，在 Python2.5 被完全实现，但是是需要通过<code>from __future__ import absolute_import</code>来打开该引入进制。在 Python2.6 之后以及 Python3，完全引用成为 Python 的默认的引入机制。它的使用方法如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from pkg import foo</span></span>
<span class="line"><span>from pkg.moduleA import foo</span></span></code></pre></div><p>要注意的是，需要从包目录最顶层目录依次写下，而不能从中间开始。</p><p>在使用该引入方式时，我们碰到比较多的问题就是因为位置原因，Python 找不到相应的库文件，抛出 ImportError 的异常。让我们看一个完全引用的例子:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span>ex3</span></span>
<span class="line"><span>├── __init__.py</span></span>
<span class="line"><span>├── foo.py</span></span>
<span class="line"><span>└── main.py</span></span>
<span class="line"><span>&quot;&quot;&quot;</span></span>
<span class="line"><span># foo.py</span></span>
<span class="line"><span>a = 2</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># main.py</span></span>
<span class="line"><span>print __name__</span></span>
<span class="line"><span>print __package__</span></span>
<span class="line"><span>from ex2.foo import a</span></span>
<span class="line"><span>print a</span></span></code></pre></div><p>我们尝试着去运行 main.py 文件，Python 解释器会抛出 ImportError。那么我们如何解决这个问题呢？</p><pre><code>╰─$ python ex3/main.py
__main__
None
Traceback (most recent call last):
File &quot;ex3/main.py&quot;, line 3, in &lt;module&gt;
  from ex2.foo import a
ImportError: No module named ex2.foo
</code></pre><p>首先，我们也可以使用前文所述的 module 的方式去运行程序，通过-m 参数来告诉解释器<code>__package__</code>属性。如下：</p><pre><code>╭─liuchang@liuchangdeMacBook-Pro  ~/Codes/pycon
╰─$ python -m ex3.main                                                                             
__main__
ex3
2
</code></pre><p>另外，我们还有一个办法可以解决该问题，在描述之前，我们介绍一个关于 Python 的非常有用的小知识：<strong>Python 解释器会自动将当前工作目录添加到 sys.path</strong>。如下所示，可以看到我们打印出的<code>sys.path</code>已经包含了当前工作目录。</p><pre><code>╭─liuchang@liuchangdeMacBook-Pro  ~/Codes/pycon/ex4
╰─$ cat main.py
import sys
print sys.path
╭─liuchang@liuchangdeMacBook-Pro  ~/Codes/pycon/ex4
╰─$ python main.py
[&#39;/Users/liuchang/Codes/pycon/ex4&#39;, &#39;/Library/Python/2.7/site-packages/pip-7.1.0-py2.7.egg&#39;, &#39;/Library/Python/2.7/site-packages/mesos-_PACKAGE_VERSION_-py2.7.egg&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python27.zip&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-darwin&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/plat-mac/lib-scriptpackages&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/Extras/lib/python&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-tk&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-old&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload&#39;, &#39;/Users/liuchang/Library/Python/2.7/lib/python/site-packages&#39;, &#39;/usr/local/lib/python2.7/site-packages&#39;, &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/Extras/lib/python/PyObjC&#39;, &#39;/Library/Python/2.7/site-packages&#39;]
</code></pre><p>了解了 Python 解释器的这个特性后，我们就可以解决完全引用的找不到类库的问题：执行的时候，让解释器自动的将类库的目录添加到 PYTHONPATH 中。</p><p>我们可以在顶层目录中添加一个 run_ex3.py 的文件，文件内容和运行结果如下，可以看到 Python 解释器正确的执行了 ex3.main 文件。</p><pre><code>╭─liuchang@liuchangdeMacBook-Pro  ~/Codes/pycon
╰─$ cat run_ex3.py
from ex3 import main
╭─liuchang@liuchangdeMacBook-Pro  ~/Codes/pycon
╰─$ python run_ex3.py
ex3.main
None
2
</code></pre><h2 id="一些实践经验" tabindex="-1">一些实践经验 <a class="header-anchor" href="#一些实践经验" aria-label="Permalink to &quot;一些实践经验&quot;">​</a></h2><h3 id="相对引用还是绝对引用" tabindex="-1">相对引用还是绝对引用 <a class="header-anchor" href="#相对引用还是绝对引用" aria-label="Permalink to &quot;相对引用还是绝对引用&quot;">​</a></h3><p>相对引用还是绝对引用？</p><p>上面介绍了 Python 的两种引用方式，都可以解决引入歧义的问题。那我们应该使用哪一种呢？</p><p>先说明一下 Python 的默认引用方式，在 Python2.4 及之前，Python 只有相对引用这一种方式，在 Python2.5 中实现了绝对引用，但默认没有打开，需要用户自己指定使用该引用方式。在之后的版本和 Python3 版本，绝对引用已经成为默认的引用方式。</p><p>其次，二种引用方式各有利弊。绝对引用代码更加清晰明了，可以清楚的看到引入的包名和层次，但是，当包名修改的时候，我们需要手动修改所有的引用代码。相对引用则比较精简，不会被包名修改所影响，但是可读性较差，不如完全引用清晰。</p><p>最后，对于两种引用的方式选择，还是有争论的。在 PEP8 中，Python 官方推荐的是绝对引用,详细理由可以参考<a href="https://www.python.org/dev/peps/pep-0008/#imports" target="_blank" rel="noreferrer">这儿</a>。</p><blockquote><p>Absolute imports are recommended, as they are usually more readable and tend to be better behaved (or at least give better error messages) if the import system is incorrectly configured (such as when a directory inside a package ends up on sys.path ):</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import mypkg.sibling</span></span>
<span class="line"><span>from mypkg import sibling</span></span>
<span class="line"><span>from mypkg.sibling import example</span></span></code></pre></div><blockquote><p>However, explicit relative imports are an acceptable alternative to absolute imports, especially when dealing with complex package layouts where using absolute imports would be unnecessarily verbose:</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from . import sibling</span></span>
<span class="line"><span>from .sibling import example</span></span></code></pre></div><blockquote><p>Standard library code should avoid complex package layouts and always use absolute imports. Implicit relative imports should never be used and have been removed in Python 3.</p></blockquote><h3 id="规范打包发布" tabindex="-1">规范打包发布 <a class="header-anchor" href="#规范打包发布" aria-label="Permalink to &quot;规范打包发布&quot;">​</a></h3><p>为了别人使用自己代码的方便，应该尽量使用规范的包分发机制。为自己的 Python 包编写正确的 setup.py 文件，添加相应的 README.md 文件。对于提供一些可执行命令的包，则可以使用 console_entrypoint 的机制来提供。因为打包和分发不是本文重点，不再详细叙述，大家可以查看官方文档。</p><h3 id="使用-virtualenv-管理包依赖" tabindex="-1">使用 virtualenv 管理包依赖 <a class="header-anchor" href="#使用-virtualenv-管理包依赖" aria-label="Permalink to &quot;使用 virtualenv 管理包依赖&quot;">​</a></h3><p>使用 virtualenv 管理包依赖</p><p>在使用 Python 的时候，尽量使用 virtualenv 来管理项目，所有的项目从编写到运行都在特定的 virtualenv 中。并且为自己的项目生成正确的依赖描述文件。</p><pre><code>pip freeze &gt; requirements.txt
</code></pre><p>关于 virtualenv 的用法，可以参考我之前的一篇文章<a href="http://lcblog-wordpress.stor.sinaapp.com/uploads/2015/10/virtualenv%E6%95%99%E7%A8%8B.pdf" target="_blank" rel="noreferrer">virtualenv 教程</a>。</p><h2 id="python-import-实现" tabindex="-1">python import 实现 <a class="header-anchor" href="#python-import-实现" aria-label="Permalink to &quot;python import 实现&quot;">​</a></h2><p>Python 提供了 import 语句来实现类库的引用，下面我们详细介绍当执行了 import 语句的时候，内部究竟做了些什么事情。</p><p>当我们执行一行 <code>from package import module as mymodule</code>命令时，Python 解释器会查找 package 这个包的 module 模块，并将该模块作为 mymodule 引入到当前的工作空间。所以 import 语句主要是做了二件事：</p><ol><li>查找相应的 module</li><li>加载 module 到 local namespace</li></ol><p>下面我们详细了解 python 是如何查找模块的。</p><h3 id="查找-module-的过程" tabindex="-1">查找 module 的过程 <a class="header-anchor" href="#查找-module-的过程" aria-label="Permalink to &quot;查找 module 的过程&quot;">​</a></h3><p>在 import 的第一个阶段，主要是完成了查找要引入模块的功能，这个查找的过程如下：</p><ol><li>检查 sys.modules (保存了之前 import 的类库的缓存），如果 module 被找到，则⾛到第二步。</li><li>检查 sys.meta_path。meta_path 是一个 list，⾥面保存着一些 finder 对象，如果找到该 module 的话，就会返回一个 finder 对象。</li><li>检查⼀些隐式的 finder 对象，不同的 python 实现有不同的隐式 finder，但是都会有 sys.path_hooks, sys.path_importer_cache 以及 sys.path。</li><li>抛出 ImportError。</li></ol><h4 id="sysmodules" tabindex="-1">sysmodules <a class="header-anchor" href="#sysmodules" aria-label="Permalink to &quot;sysmodules&quot;">​</a></h4><p>对于第一步中 sys.modules，我们可以打开 Python 来实际的查看一下其内容：</p><pre><code>Python 2.7.10 (default, Aug 22 2015, 20:33:39)
[GCC 4.2.1 Compatible Apple LLVM 7.0.0 (clang-700.0.59.1)] on darwin
Type &quot;help&quot;, &quot;copyright&quot;, &quot;credits&quot; or &quot;license&quot; for more information.
&gt;&gt;&gt; import sys
&gt;&gt;&gt; sys.modules
{&#39;copy_reg&#39;: &lt;module &#39;copy_reg&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/copy_reg.pyc&#39;&gt;, &#39;sre_compile&#39;: &lt;module &#39;sre_compile&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/sre_compile.pyc&#39;&gt;, &#39;_sre&#39;: &lt;module &#39;_sre&#39; (built-in)&gt;, &#39;encodings&#39;: &lt;module &#39;encodings&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/encodings/__init__.pyc&#39;&gt;, &#39;site&#39;: &lt;module &#39;site&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site.pyc&#39;&gt;, &#39;__builtin__&#39;: &lt;module &#39;__builtin__&#39; (built-in)&gt;, &#39;sysconfig&#39;: &lt;module &#39;sysconfig&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/sysconfig.pyc&#39;&gt;, &#39;encodings.encodings&#39;: None, &#39;__main__&#39;: &lt;module &#39;__main__&#39; (built-in)&gt;, &#39;supervisor&#39;: &lt;module &#39;supervisor&#39; (built-in)&gt;, &#39;abc&#39;: &lt;module &#39;abc&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/abc.pyc&#39;&gt;, &#39;posixpath&#39;: &lt;module &#39;posixpath&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/posixpath.pyc&#39;&gt;, &#39;_weakrefset&#39;: &lt;module &#39;_weakrefset&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/_weakrefset.pyc&#39;&gt;, &#39;errno&#39;: &lt;module &#39;errno&#39; (built-in)&gt;, &#39;encodings.codecs&#39;: None, &#39;sre_constants&#39;: &lt;module &#39;sre_constants&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/sre_constants.pyc&#39;&gt;, &#39;re&#39;: &lt;module &#39;re&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/re.pyc&#39;&gt;, &#39;_abcoll&#39;: &lt;module &#39;_abcoll&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/_abcoll.pyc&#39;&gt;, &#39;types&#39;: &lt;module &#39;types&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/types.pyc&#39;&gt;, &#39;_codecs&#39;: &lt;module &#39;_codecs&#39; (built-in)&gt;, &#39;encodings.__builtin__&#39;: None, &#39;_warnings&#39;: &lt;module &#39;_warnings&#39; (built-in)&gt;, &#39;genericpath&#39;: &lt;module &#39;genericpath&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/genericpath.pyc&#39;&gt;, &#39;stat&#39;: &lt;module &#39;stat&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/stat.pyc&#39;&gt;, &#39;zipimport&#39;: &lt;module &#39;zipimport&#39; (built-in)&gt;, &#39;_sysconfigdata&#39;: &lt;module &#39;_sysconfigdata&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/_sysconfigdata.pyc&#39;&gt;, &#39;mpl_toolkits&#39;: &lt;module &#39;mpl_toolkits&#39; (built-in)&gt;, &#39;warnings&#39;: &lt;module &#39;warnings&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/warnings.pyc&#39;&gt;, &#39;UserDict&#39;: &lt;module &#39;UserDict&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/UserDict.pyc&#39;&gt;, &#39;encodings.utf_8&#39;: &lt;module &#39;encodings.utf_8&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/encodings/utf_8.pyc&#39;&gt;, &#39;sys&#39;: &lt;module &#39;sys&#39; (built-in)&gt;, &#39;_osx_support&#39;: &lt;module &#39;_osx_support&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/_osx_support.pyc&#39;&gt;, &#39;codecs&#39;: &lt;module &#39;codecs&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/codecs.pyc&#39;&gt;, &#39;readline&#39;: &lt;module &#39;readline&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload/readline.so&#39;&gt;, &#39;os.path&#39;: &lt;module &#39;posixpath&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/posixpath.pyc&#39;&gt;, &#39;_locale&#39;: &lt;module &#39;_locale&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload/_locale.so&#39;&gt;, &#39;signal&#39;: &lt;module &#39;signal&#39; (built-in)&gt;, &#39;traceback&#39;: &lt;module &#39;traceback&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/traceback.pyc&#39;&gt;, &#39;linecache&#39;: &lt;module &#39;linecache&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/linecache.pyc&#39;&gt;, &#39;posix&#39;: &lt;module &#39;posix&#39; (built-in)&gt;, &#39;encodings.aliases&#39;: &lt;module &#39;encodings.aliases&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/encodings/aliases.pyc&#39;&gt;, &#39;exceptions&#39;: &lt;module &#39;exceptions&#39; (built-in)&gt;, &#39;sre_parse&#39;: &lt;module &#39;sre_parse&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/sre_parse.pyc&#39;&gt;, &#39;os&#39;: &lt;module &#39;os&#39; from &#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/os.pyc&#39;&gt;, &#39;_weakref&#39;: &lt;module &#39;_weakref&#39; (built-in)&gt;}
&gt;&gt;&gt; sys.modules[&#39;zlib&#39;].__file__
&#39;/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/lib-dynload/zlib.so&#39;
</code></pre><p>可以看到 sys.modules 已经保存了一些包的信息，由这些信息，我们就可以直接知道要查找的包的位置等信息。</p><h4 id="finderloader-和-importer" tabindex="-1">finderloader 和 importer <a class="header-anchor" href="#finderloader-和-importer" aria-label="Permalink to &quot;finderloader 和 importer&quot;">​</a></h4><p>在上文中，我们提到了 sys.meta_path 中保证了一些 finder 对象。在 python 中，不仅定义了 finder 的概念，还定义了 loader 和 importor 的概念。</p><ul><li>finder 的任务是决定自己是否根据名字找到相应的模块，在 py2 中，finder 对象必须实现 find_module()方法，在 py3 中必须要实现 find_module()或者 find_loader（)方法。如果 finder 可以查找到模块，则会返回一个 loader 对象(在 py3.4 中，修改为返回一个 module specs)。</li><li>loader 则是负责加载模块，它必须实现一个 load_module()的方法。</li><li>importer 则指一个对象，实现了 finder 和 loader 的方法。因为 Python 是 duck type，只要实现了方法，就可以认为是该类。</li></ul><h4 id="sysmeta-path" tabindex="-1">sysmeta_path <a class="header-anchor" href="#sysmeta-path" aria-label="Permalink to &quot;sysmeta\\_path&quot;">​</a></h4><p>在 Python 查找的时候，如果在 sys.modules 没有查找到，就会依次调用 sys.meta_path 中的 finder 对象。默认的情况下，sys.meta_path 是一个空列表，并没有任何 finder 对象。</p><pre><code>In [6]: sys.meta_path
Out[6]: []
</code></pre><p>我们可以向 sys.meta_path 中添加一些定义的 finder，来实现对 Python 加载模块的修改。比如下例，我们实现了一个会将每次加载包的信息打印出来的 finder。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from __future__ import print_function</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Watcher(object):</span></span>
<span class="line"><span>    @classmethod</span></span>
<span class="line"><span>    def find_module(cls, name, path, target=None):</span></span>
<span class="line"><span>        print(&quot;Importing&quot;, name, path, target)</span></span>
<span class="line"><span>        return None</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sys.meta_path.insert(0, Watcher)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import socket</span></span></code></pre></div><p>当我们执行的时候，就可以看到系统加载 socket 包时所发生的事情。</p><pre><code> ╭─liuchang@localhost  ~/Codes/pycon/ex5_meta_path
 ╰─$ python finder1.py
 Importing socket None None
 Importing _socket None None
 Importing functools None None
 Importing _functools None None
 Importing _ssl None None
 Importing cStringIO None None
</code></pre><h4 id="syspath-hook" tabindex="-1">syspath hook <a class="header-anchor" href="#syspath-hook" aria-label="Permalink to &quot;syspath hook&quot;">​</a></h4><p>Python import 的 hook 分为二类，一类是上一章节已经描述的 meta hook，另一类是 path hook。</p><p>当处理 sys.path（或者 package.<strong>path</strong>)时，就会调用对应的一部分的 Pack hook。Path Hook 是通过向 sys.path_hooks 中添加一个 importer 生成器来注册的。</p><p>sys.path_hooks 是由可被调用的对象组成，它会顺序的检查以决定他们是否可以处理给定的 sys.path 的一项。每个对象会使用 sys.path 项的路径来作为参数被调用。如果它不能处理该路径，就必须抛出 ImportError，如果可以，则会返回一个 importer 对象。之后，不会再尝试其它的 sys.path_hooks 对象，即使前一个 importer 出错了。</p><p>详细可以参考<a href="https://www.python.org/dev/peps/pep-0302/#specification-part-2-registering-hooks" target="_blank" rel="noreferrer">registering-hooks</a>。</p><h2 id="python-import-hooks" tabindex="-1">python import hooks <a class="header-anchor" href="#python-import-hooks" aria-label="Permalink to &quot;python import hooks&quot;">​</a></h2><p>在介绍完 Python 的引用机制与一些实现方法后，接下来我们介绍一些关于如何根据自己的需求来扩展 Python 的引用机制。</p><p>在开始详细介绍前，给大家展示一个实用性不高，但是很有意思的例子：<strong>让 Python 在执行代码的时候自动安装缺失的类库</strong>。我们会实现一个 autoinstall 的模块，只要 import 了该模块，就可以打开该功能。如下所示，我们尝试引入 tornado 库的时候，iPython 会提示我们没有安装。然后，我们引入了 autoinstall，再尝试引入 tornado，iPython 就会自动的安装 tornado 库。</p><pre><code>In [1]: import tornado
---------------------------------------------------------------------------
ImportError                               Traceback (most recent call last)
&lt;ipython-input-1-3eac10687b7e&gt; in &lt;module&gt;()
----&gt; 1 import tornado

ImportError: No module named tornado

In [2]: import autoinstall

In [3]: import tornado
Installing tornado

Collecting tornado
  Downloading tornado-4.2.1.tar.gz (434kB)
Collecting backports.ssl-match-hostname (from tornado)
  Downloading http://182.92.2.186:7002/packages/backports.ssl_match_hostname-3.4.0.2-py2-none-any.whl
Collecting certifi (from tornado)
  Downloading certifi-2015.9.6.2-py2.py3-none-any.whl (371kB)
Installing collected packages: backports.ssl-match-hostname, certifi, tornado
  Running setup.py install for tornado
Successfully installed backports.ssl-match-hostname-3.4.0.2 certifi-2015.9.6.2 tornado-4.2.1
</code></pre><p>这个功能的实现其实很简单，利用了 sys.meta_path。autoinstall 的全部代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from __future__ import print_function</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span>import subprocess</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class AutoInstall(object):</span></span>
<span class="line"><span>    _loaded = set()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @classmethod</span></span>
<span class="line"><span>    def find_module(cls, name, path, target=None):</span></span>
<span class="line"><span>        if path is None and name not in cls._loaded:</span></span>
<span class="line"><span>            cls._loaded.add(name)</span></span>
<span class="line"><span>            print(&quot;Installing&quot;, name)</span></span>
<span class="line"><span>            try:</span></span>
<span class="line"><span>                out = subprocess.check_output([&#39;sudo&#39;, sys.executable, &#39;-m&#39;, &#39;pip&#39;, &#39;install&#39;, name])</span></span>
<span class="line"><span>                print(out)</span></span>
<span class="line"><span>            except Exception as e:</span></span>
<span class="line"><span>                print(&quot;Failed&quot; + e.message)</span></span>
<span class="line"><span>        return None</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sys.meta_path.append(AutoInstall)</span></span></code></pre></div><h3 id="import-hook-的重要性" tabindex="-1">import hook 的重要性 <a class="header-anchor" href="#import-hook-的重要性" aria-label="Permalink to &quot;import hook 的重要性&quot;">​</a></h3><p>我们为什么需要 Python import 的 hook 呢？使用 import 的 hook 可以让我们做到很多事情，比如说当我们的 Python 包存储在一个非标准的文件中，或者 Python 程序存储在网络数据库中，或者像 py2exe 一样将 Python 程序打包成了一个文件，我们需要一种方法来正确的解析它们。</p><p>其次，我们希望在 Python 加载类库的时候，可以额外的做一些事情，比如上传审计信息，比如延迟加载，比如自动解决上例的依赖未安装的问题。</p><p>所以，import 系统的 Hook 技术是值的花时间学习的。</p><h3 id="如何实现-import-hooks" tabindex="-1">如何实现 import hooks <a class="header-anchor" href="#如何实现-import-hooks" aria-label="Permalink to &quot;如何实现 import hooks&quot;">​</a></h3><p>Python 提供了一些方法，让我们可以在代码中动态的调用 import。主要有如下几种：</p><ol><li>__import__ : Python 的内置函数</li><li>imputil : Python 的 import 工具库，在 py2.6 被声明废弃，py3 中彻底移除。</li><li>imp : Python2 的一个 import 库，py3 中移除</li><li>importlib : Python3 中最新添加，backport 到 py2.7，但只有很小的子集（只有一个函数）。</li></ol><p>Python2 所有关于 import 的库的列表参见<a href="https://docs.python.org/2/library/modules.html" target="_blank" rel="noreferrer">Importing Modules</a>。Python3 的可以参考<a href="https://docs.python.org/3/library/modules.html" target="_blank" rel="noreferrer">Importing Modules</a> <a href="https://www.python.org/dev/peps/pep-0302" target="_blank" rel="noreferrer">PEP 0302 – New Import Hooks</a> 提案详细的描述了 importlib 的目的、用法。</p><h3 id="一些-hook-示例" tabindex="-1">一些 hook 示例 <a class="header-anchor" href="#一些-hook-示例" aria-label="Permalink to &quot;一些 hook 示例&quot;">​</a></h3><h4 id="lazy-化库引入" tabindex="-1">lazy 化库引入 <a class="header-anchor" href="#lazy-化库引入" aria-label="Permalink to &quot;lazy 化库引入&quot;">​</a></h4><p>Lazy 化库引入</p><p>使用 Import Hook，我们可以达到 Lazy Import 的效果，当我们执行 import 的时候，实际上并没引入该库，只有真正的使用这个库的时候，才会将其引入到当前工作空间。 具体的代码可以参考<a href="https://github.com/noahmorrison/limp" target="_blank" rel="noreferrer">github</a>。 实现的效果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/usr/bin/python</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import limp  # Lazy imports begin now</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import json</span></span>
<span class="line"><span>import sys</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&#39;json&#39; in sys.modules)  # False</span></span>
<span class="line"><span>print(&#39;, &#39;.join(json.loads(&#39;[&quot;Hello&quot;, &quot;World!&quot;]&#39;)))</span></span>
<span class="line"><span>print(&#39;json&#39; in sys.modules)  # True</span></span></code></pre></div><p>它的实现也很简单：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import sys</span></span>
<span class="line"><span>import imp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>_lazy_modules = {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class LazyModule():</span></span>
<span class="line"><span>    def __init__(self, name):</span></span>
<span class="line"><span>        self.name = name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __getattr__(self, attr):</span></span>
<span class="line"><span>        path = _lazy_modules[self.name]</span></span>
<span class="line"><span>        f, pathname, desc = imp.find_module(self.name, path)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        lf = sys.meta_path.pop()</span></span>
<span class="line"><span>        imp.load_module(self.name, f, pathname, desc)</span></span>
<span class="line"><span>        sys.meta_path.append(lf)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        self.__dict__ = sys.modules[self.name].__dict__</span></span>
<span class="line"><span>        return self.__dict__[attr]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class LazyFinder(object):</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def find_module(self, name, path):</span></span>
<span class="line"><span>        _lazy_modules[name] = path</span></span>
<span class="line"><span>        return self</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def load_module(self, name):</span></span>
<span class="line"><span>        return LazyModule(name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sys.meta_path.append(LazyFinder())</span></span></code></pre></div><h4 id="flask-插件库统一入口" tabindex="-1">flask-插件库统一入口 <a class="header-anchor" href="#flask-插件库统一入口" aria-label="Permalink to &quot;flask-插件库统一入口&quot;">​</a></h4><p>使用过 Flask 的同学都知道，Flask 的对于插件提供了统一的入口。比如说我们安装了 Flask_API 这个库，然后我们可以直接<code>import flask_api</code>来使用这个库，同时 Flask 还允许我们采用<code>import flask.ext.api</code>的方式来引用该库。</p><p>这里 Flask 就是使用了 import 的 hook，当引入 flask.ext 的包时，就自动的引用相应的库。Flask 实现了一个叫 ExtensionImporter 的类，这个类实现了 find_module 和 load_module 代码实现如下<a href="https://github.com/mitsuhiko/flask/blob/master/flask/exthook.py#L27" target="_blank" rel="noreferrer">github</a>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class ExtensionImporter(object):</span></span>
<span class="line"><span>    &quot;&quot;&quot;This importer redirects imports from this submodule to other locations.</span></span>
<span class="line"><span>    This makes it possible to transition from the old flaskext.name to the</span></span>
<span class="line"><span>    newer flask_name without people having a hard time.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __init__(self, module_choices, wrapper_module):</span></span>
<span class="line"><span>        self.module_choices = module_choices</span></span>
<span class="line"><span>        self.wrapper_module = wrapper_module</span></span>
<span class="line"><span>        self.prefix = wrapper_module + &#39;.&#39;</span></span>
<span class="line"><span>        self.prefix_cutoff = wrapper_module.count(&#39;.&#39;) + 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __eq__(self, other):</span></span>
<span class="line"><span>        return self.__class__.__module__ == other.__class__.__module__ and \\</span></span>
<span class="line"><span>               self.__class__.__name__ == other.__class__.__name__ and \\</span></span>
<span class="line"><span>               self.wrapper_module == other.wrapper_module and \\</span></span>
<span class="line"><span>               self.module_choices == other.module_choices</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __ne__(self, other):</span></span>
<span class="line"><span>        return not self.__eq__(other)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def install(self):</span></span>
<span class="line"><span>        sys.meta_path[:] = [x for x in sys.meta_path if self != x] + [self]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def find_module(self, fullname, path=None):</span></span>
<span class="line"><span>        if fullname.startswith(self.prefix):</span></span>
<span class="line"><span>            return self</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def load_module(self, fullname):</span></span>
<span class="line"><span>        if fullname in sys.modules:</span></span>
<span class="line"><span>            return sys.modules[fullname]</span></span>
<span class="line"><span>        modname = fullname.split(&#39;.&#39;, self.prefix_cutoff)[self.prefix_cutoff]</span></span>
<span class="line"><span>        for path in self.module_choices:</span></span>
<span class="line"><span>            realname = path % modname</span></span>
<span class="line"><span>            try:</span></span>
<span class="line"><span>                __import__(realname)</span></span>
<span class="line"><span>            except ImportError:</span></span>
<span class="line"><span>                exc_type, exc_value, tb = sys.exc_info()</span></span>
<span class="line"><span>                # since we only establish the entry in sys.modules at the</span></span>
<span class="line"><span>                # very this seems to be redundant, but if recursive imports</span></span>
<span class="line"><span>                # happen we will call into the move import a second time.</span></span>
<span class="line"><span>                # On the second invocation we still don&#39;t have an entry for</span></span>
<span class="line"><span>                # fullname in sys.modules, but we will end up with the same</span></span>
<span class="line"><span>                # fake module name and that import will succeed since this</span></span>
<span class="line"><span>                # one already has a temporary entry in the modules dict.</span></span>
<span class="line"><span>                # Since this one &quot;succeeded&quot; temporarily that second</span></span>
<span class="line"><span>                # invocation now will have created a fullname entry in</span></span>
<span class="line"><span>                # sys.modules which we have to kill.</span></span>
<span class="line"><span>                sys.modules.pop(fullname, None)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                # If it&#39;s an important traceback we reraise it, otherwise</span></span>
<span class="line"><span>                # we swallow it and try the next choice.  The skipped frame</span></span>
<span class="line"><span>                # is the one from __import__ above which we don&#39;t care about</span></span>
<span class="line"><span>                if self.is_important_traceback(realname, tb):</span></span>
<span class="line"><span>                    reraise(exc_type, exc_value, tb.tb_next)</span></span>
<span class="line"><span>                continue</span></span>
<span class="line"><span>            module = sys.modules[fullname] = sys.modules[realname]</span></span>
<span class="line"><span>            if &#39;.&#39; not in modname:</span></span>
<span class="line"><span>                setattr(sys.modules[self.wrapper_module], modname, module)</span></span>
<span class="line"><span>            return module</span></span>
<span class="line"><span>        raise ImportError(&#39;No module named %s&#39; % fullname)</span></span></code></pre></div><p>然后在 Flask 的 ext 目录下的__init__.py 文件中，初始化了该 Importer。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def setup():</span></span>
<span class="line"><span>    from ..exthook import ExtensionImporter</span></span>
<span class="line"><span>    importer = ExtensionImporter([&#39;flask_%s&#39;, &#39;flaskext.%s&#39;], __name__)</span></span>
<span class="line"><span>    importer.install()</span></span></code></pre></div><p>#::相关下载</p><p><a href="http://onlookee.com/?c=Article&amp;a=download&amp;id=10" target="_blank" rel="noreferrer">下载地址 = http://onlookee.com/?c=Article&amp;a=download&amp;id=10</a></p><p>#::theEnd</p>`,122)]))}const u=s(t,[["render",l]]);export{y as __pageData,u as default};
