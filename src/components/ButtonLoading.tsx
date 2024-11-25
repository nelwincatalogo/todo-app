'use client';

import { Button } from '@/components/ui/button';
import { SvgSpinnersBarsRotateFade } from './icon/SvgSpinnersBarsRotateFade';

export function ButtonLoading(props) {
  return (
    <Button disabled {...props}>
      <SvgSpinnersBarsRotateFade className="mr-2" />
      Please wait
    </Button>
  );
}
