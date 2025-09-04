import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '../components/ui/select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcion1">Opción 1</SelectItem>
        <SelectItem value="opcion2">Opción 2</SelectItem>
        <SelectItem value="opcion3">Opción 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecciona un país" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europa</SelectLabel>
          <SelectItem value="es">España</SelectItem>
          <SelectItem value="fr">Francia</SelectItem>
          <SelectItem value="it">Italia</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>América</SelectLabel>
          <SelectItem value="us">Estados Unidos</SelectItem>
          <SelectItem value="ca">Canadá</SelectItem>
          <SelectItem value="mx">México</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]" size="sm">
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcion1">Opción 1</SelectItem>
        <SelectItem value="opcion2">Opción 2</SelectItem>
        <SelectItem value="opcion3">Opción 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcion1">Opción 1</SelectItem>
        <SelectItem value="opcion2">Opción 2</SelectItem>
        <SelectItem value="opcion3">Opción 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <Select {...args} defaultValue="opcion2">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcion1">Opción 1</SelectItem>
        <SelectItem value="opcion2">Opción 2</SelectItem>
        <SelectItem value="opcion3">Opción 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};