import {
  trigger,
  transition,
  style,
  query,
  animate, stagger, group, state,
} from '@angular/animations';

export const signInAnimation =
  trigger('signInAnimation', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }),
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0, marginTop: -36 }),
        animate('320ms', style({ opacity: 1, marginTop: 0 })),
      ], { optional: true }),
      query(':leave', [
        style({ display: 'none' }),
      ], { optional: true }),
    ]),
  ]);

export const slideInAnimation =
  trigger('slideInAnimation', [
    transition('* => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 12,
          right: 16,
          bottom: 12,
          left: 16,
        }),
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0, marginTop: -36 }),
        animate('160ms', style({ opacity: 1, marginTop: 0 })),
      ], { optional: true }),
      query(':leave', [
        style({ display: 'none' }),
      ], { optional: true }),
    ]),
  ]);

export const errorAnimation = trigger('errorAnimation', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    animate('160ms', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('120ms', style({ height: 0, opacity: 0 })),
  ]),
]);

export const opacityAnimation = trigger('opacityAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0 })),
  ]),
]);

export const drawerAnimation = trigger('drawerAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scaleX(.5)',
    }),
    animate('200ms', style({
      opacity: 1,
      transform: 'scaleX(1)',
    })),
  ]),
  transition(':leave', [
    animate('160ms', style({
      opacity: 0,
      transform: 'scaleX(.5)',
    })),
  ]),
]);

export const slider = trigger('slider', [
  state('*', style({
    transform: 'translateX(0)',
    opacity: 1,
  })),
  transition(':increment', [
    style({
      opacity: 0,
    }),
    animate('60ms', style({
      transform: 'translateX(60px)',
    })),
    animate('120ms'),
  ]),
  transition(':decrement', [
    style({
      opacity: 0,
    }),
    animate('60ms', style({
      transform: 'translateX(-60px)',
    })),
    animate('120ms'),
  ]),
]);

