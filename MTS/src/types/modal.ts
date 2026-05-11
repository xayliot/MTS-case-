import type { Component } from 'vue';

export interface ModalOptions {
  title: string;
  body: string | Component;
  footer?: Component;
  onClose?: () => void;
}

export interface ModalInstance extends ModalOptions {
  id: string;
  returnFocusTo?: HTMLElement;
}