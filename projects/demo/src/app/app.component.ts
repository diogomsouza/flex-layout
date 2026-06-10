import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type MainAxis = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
type CrossAxis = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type WrapMode = 'wrap' | 'nowrap' | 'wrap-reverse';

interface Example {
  title: string;
  note: string;
  code: string;
}

interface TokenGroup {
  label: string;
  values: string[];
  note?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  directions: Direction[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  mainAxisOptions: MainAxis[] = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'];
  crossAxisOptions: CrossAxis[] = ['start', 'center', 'end', 'stretch', 'baseline'];
  wrapOptions: WrapMode[] = ['wrap', 'nowrap', 'wrap-reverse'];
  gapOptions = ['1px', '2px', '4px', '8px', '12px', '16px', '20px'];
  itemSizeOptions = ['auto', 'w25%', 'w33%', 'w50%', 'w67%', 'w100%', 'w160px', 'w256px', 'basis'];
  percentScale = ['5%', '10%', '15%', '20%', '25%', '30%', '33%', '34%', '40%', '45%', '50%', '55%', '60%', '65%', '66%', '67%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'];
  pixelScale = [
    '0px to 1024px: even values only',
    '1030px to 1920px: every 10px',
  ];
  gapScale = ['1px to 20px', 'custom via --fl-gap'];

  direction: Direction = 'row';
  mainAxis: MainAxis = 'space-between';
  crossAxis: CrossAxis = 'stretch';
  wrap: WrapMode = 'wrap';
  gap = '16px';
  firstItemSize = 'w33%';
  secondItemSize = 'w33%';
  thirdItemSize = 'w33%';
  customBasis = 280;
  copiedCode = '';
  viewportWidth = this.getViewportWidth();

  tokenGroups: TokenGroup[] = [
    {
      label: 'Layout',
      values: ['row', 'row-reverse', 'column', 'column-reverse', 'wrap', 'nowrap', 'wrap-reverse'],
    },
    {
      label: 'Alignment',
      values: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly', 'p-start', 'p-center', 'p-end', 'p-stretch', 'p-baseline'],
    },
    {
      label: 'Flex',
      values: ['auto', 'none', 'initial', 'grow', 'nogrow', 'noshrink', 'basis', 'w25%', 'w33%', 'w50%', 'w100%', 'w320px'],
    },
    {
      label: 'Percent sizes',
      values: this.percentScale,
      note: 'Use as w/h tokens: w50%, h100%, data-flex-xs="w100%".',
    },
    {
      label: 'Pixel sizes',
      values: this.pixelScale,
      note: 'Use as w/h tokens: w320px, h128px, data-flex-gt-md="w1440px".',
    },
    {
      label: 'Gap sizes',
      values: this.gapScale,
      note: 'Generated data-gap values are intentionally limited.',
    },
    {
      label: 'Responsive',
      values: ['data-layout-xs', 'data-layout-lt-md', 'data-flex-xs', 'data-hide-lt-md', 'data-hide-gt-sm'],
    },
  ];

  examples: Example[] = [
    {
      title: 'Responsive stacked form',
      note: 'Two columns on larger screens, one column below 960px.',
      code: `<form data-layout="row wrap" data-layout-lt-md="column" data-gap="16px">
  <label data-flex="w50%" data-flex-lt-md="w100%">Name</label>
  <label data-flex="w50%" data-flex-lt-md="w100%">Email</label>
</form>`,
    },
    {
      title: 'Fixed sidebar with flexible content',
      note: 'Use base and breakpoint CSS variables when basis must change responsively.',
      code: `<div data-layout="row" data-layout-xs="column" data-gap="20px">
  <aside
    data-flex="basis"
    data-flex-xs="basis"
    style="--fl-basis: 320px; --fl-basis-xs: 100%"
  >
    Filters
  </aside>
  <main data-flex>Results</main>
</div>`,
    },
    {
      title: 'Breakpoint visibility',
      note: 'Hide dense controls on small screens without Angular runtime directives.',
      code: `<button data-hide-lt-md>Advanced filters</button>
<button data-hide-gt-sm>Filters</button>`,
    },
  ];

  get activeBreakpoint(): string {
    const width = this.viewportWidth;

    if (width < 600) {
      return 'xs';
    }

    if (width < 960) {
      return 'sm';
    }

    if (width < 1280) {
      return 'md';
    }

    if (width < 1920) {
      return 'lg';
    }

    return 'xl';
  }

  get layoutValue(): string {
    return `${this.direction} ${this.wrap} ${this.mainAxis} p-${this.crossAxis}`;
  }

  get firstFlexValue(): string {
    return this.flexValue(this.firstItemSize);
  }

  get secondFlexValue(): string {
    return this.flexValue(this.secondItemSize);
  }

  get thirdFlexValue(): string {
    return this.flexValue(this.thirdItemSize);
  }

  get firstStyle(): string | null {
    return this.firstItemSize === 'basis' ? `--fl-basis: ${this.customBasis}px` : null;
  }

  get playgroundCode(): string {
    const firstStyle = this.firstStyle ? ` style="${this.firstStyle}"` : '';

    return `<div data-layout="${this.layoutValue}" data-layout-xs="column" data-gap="${this.gap}">
  <div data-flex="${this.firstFlexValue}" data-flex-xs="w100%"${firstStyle}>Alpha</div>
  <div data-flex="${this.secondFlexValue}" data-flex-xs="w100%">Beta</div>
  <div data-flex="${this.thirdFlexValue}" data-flex-xs="w100%">Gamma</div>
</div>`;
  }

  @HostListener('window:resize')
  updateViewport(): void {
    this.viewportWidth = this.getViewportWidth();
  }

  copy(code: string): void {
    this.copiedCode = code;

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    void navigator.clipboard.writeText(code);
  }

  private flexValue(value: string): string {
    return value === 'auto' ? 'auto' : value;
  }

  private getViewportWidth(): number {
    return typeof window === 'undefined' ? 1280 : window.innerWidth;
  }
}
