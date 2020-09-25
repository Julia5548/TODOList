from django.test import TestCase

from django.contrib.auth.models import User
from todos.models import Todo


class TodoModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        # создает эземляр модели и сохраняет ее
        # вызывается один раз в начале тестового запуска для настройки уровня класса
        user = User.objects.create(username = "Julia", email = "julia@mail.ru", password = "11asdfg11")
        Todo.objects.create(title = "работа", user = user)


    def test_title_label(self):
        todo=Todo.objects.get(pk=1)
        # Получение метаданных поля для получения необходимых значений
        field_label = todo._meta.get_field('title').verbose_name
        self.assertEquals(field_label,'title')

    def test_title_max_length(self):
        todo=Todo.objects.get(pk=1)

        max_length = todo._meta.get_field('title').max_length
        self.assertEquals(max_length,200)

    def test_get_data_todo(self):
        todo=Todo.objects.get(pk=1)
        result_data = {'id' : todo.id, 'title' : todo.title, 'user' : todo.user}
        data = {'id' : 1, 'title' : 'работа', 'user' : User.objects.get(id=1)}
        self.assertEquals(result_data, data)

    def test_string_representation(self):
        todo = Todo.objects.get(pk=1)
        self.assertEqual(str(todo), todo.title)