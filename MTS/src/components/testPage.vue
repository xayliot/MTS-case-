<template>
  <div class="test-page">
    <div class="container">
      <h1>Система Модальных Окон</h1>
      
      <section>
        <h3>Технические тесты</h3>
        <div class="button-group">
          <button class="btn" @click="showSimple">Простое</button>
          <button class="btn" @click="showInnerScroll">Внутренний скролл</button>
          <button class="btn" @click="showPageScroll">Скролл страницы</button>
          <button class="btn" @click="showQueue(1)">Очередь</button>
          <button class="btn" @click="showButtonDemo">Проверка кликабельности</button>
        </div>
      </section>

      <section>
        <h3>Примеры интерфейсов</h3>
        <div class="button-group">
          <button class="btn btn-accent" @click="showLogin">Форма входа</button>
          <button class="btn btn-accent" @click="showSettings">Настройки</button>
          <button class="btn btn-accent" @click="showFileUpload">Загрузка</button>

        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref } from 'vue';
import AppButton from './ui/button.vue';
import AppInput from './ui/input.vue';
import AppToggle from './ui/toggle.vue';
import AppFileUpload from './ui/fileUpload.vue';
import { useModal } from '@/composables/useModal';
import AppTextarea from './ui/textarea.vue';

const { show, close, closeAll } = useModal();

const showFileUpload = () => {
  show({
    title: 'Файлы',
    body: AppFileUpload,
    footer: defineComponent({
      setup: () => () => h(AppButton, { label: 'Закрыть', onClick: close })
    })
  });
};

const showSimple = () => {
  show({
    title: 'Простое окно',
    body: 'Базовый пример модального окна без лишних элементов.',
    footer: defineComponent({
      setup: () => () => h(AppButton, { label: 'Закрыть', onClick: close })
    })
  });
};

const showInnerScroll = () => {
  const content = Array(30).fill('<p>Длинный текст для проверки внутреннего скролла...</p>').join('');
  show({
    title: 'Внутренний скролл',
    body: h('div', { class: 'scroll-content', innerHTML: content }),
    footer: defineComponent({
      setup: () => () => h(AppButton, { label: 'Понятно', onClick: close })
    })
  });
};

const showPageScroll = () => {
  show({
    title: 'Анкета напарника',
    body: defineComponent({
      setup() {
        const userName = ref('');
        const userBio = ref('');
        
        return () => h('div', { class: 'form-container' }, [
          h(AppInput, { 
            label: 'Ваше имя', 
            modelValue: userName.value, 
            'onUpdate:modelValue': (v: string) => userName.value = v,
            placeholder: 'Иван'
          }),

          h(AppTextarea, {
            label: 'Почему вы хотите завести котика?',
            modelValue: userBio.value,
            'onUpdate:modelValue': (v: string) => userBio.value = v,
            placeholder: 'Опишите ваши причины...',
            rows: 5
          }),

          h(AppFileUpload, { label: 'Фото вашего дома' }),

          h('div', { class: 'cat-section' }, [
            h('p', { class: 'cat-section-title' }, 'Ваш будущий напарник:'),
            h('img', { 
              src: 'https://koshka.top/uploads/posts/2021-12/1639982053_1-koshka-top-p-koshki-s-glupimi-mordami-1.jpg', 
              alt: 'Cute cat',
              class: 'cat-image'
            })
          ]),

          h(AppFileUpload, { label: 'Скан паспорта' }),
        ]);
      }
    }),
    footer: defineComponent({
      setup: () => () => [
        h(AppButton, { label: 'Отправить', variant: 'primary', onClick: close }),
        h(AppButton, { label: 'Отмена', variant: 'secondary', onClick: close })
      ]
    })
  });
};

const showQueue = (num: number) => {
  show({
    title: `Окно №${num}`,
    body: `Вы открыли модальное окно уровня ${num}.`,
    footer: defineComponent({
      setup: () => () => h('div', { class: 'button-group-row' }, [
        h(AppButton, { label: 'Открыть ещё', onClick: () => showQueue(num + 1) }),
        h(AppButton, { label: 'Закрыть это', variant: 'secondary', onClick: close }),
        h(AppButton, { label: 'Закрыть все', variant: 'danger', onClick: closeAll })
      ])
    })
  });
};

const showLogin = () => {
  show({
    title: 'Авторизация',
    body: defineComponent({
      setup() {
        const email = ref('');
        const pass = ref('');
        return () => h('div', { class: 'form-container-login' }, [
          h(AppInput, { label: 'Логин', modelValue: email.value, 'onUpdate:modelValue': (v) => email.value = v }),
          h(AppInput, { label: 'Пароль', type: 'password', modelValue: pass.value, 'onUpdate:modelValue': (v) => pass.value = v })
        ]);
      }
    }),
    footer: defineComponent({
      setup: () => () => h(AppButton, { label: 'Войти', class: 'full-width-btn', onClick: close })
    })
  });
};

const showSettings = () => {
  show({
    title: 'Настройки',
    body: defineComponent({
      setup() {
        const dark = ref(false);
        const notify = ref(true);
        return () => h('div', { class: 'settings-container' }, [
          h(AppToggle, { label: 'Тёмная тема', modelValue: dark.value, 'onUpdate:modelValue': (v) => dark.value = v }),
          h(AppToggle, { label: 'Уведомления', modelValue: notify.value, 'onUpdate:modelValue': (v) => notify.value = v })
        ]);
      }
    })
  });
};

const showButtonDemo = () => {
  show({
    title: 'Демонстрация кнопок',
    body: defineComponent({
      setup() {
        const isDisabled = ref(true);
        
        return () => h('div', { class: 'demo-container' }, [
          
          h('div', { class: 'demo-buttons-row' }, [
            h(AppButton, { 
              label: isDisabled.value ? 'Включить кнопку' : 'Выключить кнопку',
              variant: 'secondary',
              onClick: () => isDisabled.value = !isDisabled.value
            }),
            h(AppButton, { 
              label: 'Динамическая кнопка', 
              variant: 'primary',
              disabled: isDisabled.value,
              onClick: () => {
                show({ title: 'Успех!', body: 'Кнопка сработала!' });
              }
            }),
          ]),
        ]);
      }
    }),
    footer: defineComponent({
      setup: () => () => h(AppButton, { label: 'Закрыть', onClick: close })
    })
  });
};
</script>

<style>
:global(html) {
  scrollbar-gutter: stable;
}

.test-page {
  min-height: 100vh;
  background: #0f0f13;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  color: #a1a1aa; 
}

.container { 
  width: 100%; 
  max-width: 800px; 
  text-align: center; 
}

h1 {
  color: #e4e4e7;
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 28px;
}

section { 
  margin-bottom: 40px; 
  background: #18181b;
  padding: 24px; 
  border-radius: 16px; 
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.2);
  border: 1px solid #27272a;
}

h3 { 
  margin-bottom: 20px; 
  color: #d4d4d8;
  border-bottom: 1px solid #27272a; 
  padding-bottom: 10px; 
  font-weight: 500;
  font-size: 18px;
}

.button-group { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 12px; 
  justify-content: center; 
}

.btn {
  padding: 10px 22px;
  border-radius: 8px;
  border: 1px solid #3f3f46;
  background: #27272a;
  color: #d4d4d8;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn:hover { 
  background: #3f3f46; 
  border-color: #52525b; 
  color: #f4f4f5;
}

.btn-accent { 
  background: #3b5c4a; 
  color: #e4e4e7;
  border: none; 
}

.btn-accent:hover { 
  background: #4a7360; 
  box-shadow: 0 2px 8px rgba(59, 92, 74, 0.3);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container-login {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.settings-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scroll-content p {
  margin: 12px 0;
  line-height: 1.5;
}

.cat-section {
  text-align: center;
  width: 100%;
  overflow: hidden;
}

.cat-section-title {
  font-weight: 600;
  margin-bottom: 12px;
  text-align: left;
}

.cat-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid #3f3f46;
}

.button-group-row {
  display: flex;
  gap: 8px;
}

.full-width-btn {
  width: 100%;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-buttons-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}


</style>