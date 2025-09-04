import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../components/ui/calendar';
import { addDays } from 'date-fns';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    className: 'rounded-md border',
  },
};

export const WithSelectedDate: Story = {
  args: {
    className: 'rounded-md border',
    selected: new Date(),
  },
};

export const RangeSelection: Story = {
  args: {
    className: 'rounded-md border',
    mode: 'range',
    selected: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
  },
};

export const MultipleSelection: Story = {
  args: {
    className: 'rounded-md border',
    mode: 'multiple',
    selected: [new Date(), addDays(new Date(), 3), addDays(new Date(), 5)],
  },
};