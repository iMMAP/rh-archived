import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
    selector : 'fuse-hljs',
    template : ' ',
    styleUrls: ['./hljs.component.scss']
})
export class FuseHljsComponent implements OnInit
{
    hljs: any;

    @ContentChild('source') source: ElementRef;
    @Input('lang') lang: string;

    constructor(
        private elementRef: ElementRef
    )
    {
        this.hljs = hljs;
    }

    ngOnInit()
    {
        const originalSource = this.source.nativeElement.value;

        if ( !originalSource || !this.lang )
        {
            return;
        }

        // Split the source into lines
        const sourceLines = originalSource.split('\n');

        // Find the first non-whitespace char index in
        // the first line of the source code
        const indexOfFirstChar = sourceLines[0].search(/\S|$/);

        // Generate the trimmed source
        let source = '';

        // Iterate through all the lines and trim the
        // beginning white space depending on the index
        sourceLines.forEach((line, index) => {

            source = source + line.substr(indexOfFirstChar, line.length);

            if ( index !== sourceLines.length - 1 )
            {
                source = source + '\n';
            }
        });

        this.elementRef.nativeElement.innerHTML =
            `<pre><code class="highlight">` + this.hljs.highlight(this.lang, source).value + `</code></pre>`;
    }
}

