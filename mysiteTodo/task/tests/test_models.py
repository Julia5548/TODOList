from django.test import TestCase
from django.contrib.auth.models import User
from todos.models import Todo
from task.models import Task


class TaskModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        # создает эземляр модели и сохраняет ее
        # вызывается один раз в начале тестового запуска для настройки уровня класса
        user = User.objects.create(username = "Julia", email = "julia@mail.ru", password = "11asdfg11")
        todo = Todo.objects.create(title = "работа", user = user)
        Task.objects.create(id_todo = todo, title = 'исправить баг')


    def test_title_label(self):
        task=Task.objects.get(pk=1)
        # Получение метаданных поля для получения необходимых значений
        field_label = task._meta.get_field('title').verbose_name
        self.assertEquals(field_label,'title')

    def test_is_completed_label(self):
        task=Task.objects.get(pk=1)
        # Получение метаданных поля для получения необходимых значений
        field_label = task._meta.get_field('is_completed').verbose_name
        self.assertEquals(field_label,'is completed')

    def test_title_max_length(self):
        task=Task.objects.get(pk=1)

        max_length = task._meta.get_field('title').max_length
        self.assertEquals(max_length,200)

    def test_get_data_task(self):
        task=Task.objects.get(pk=1)
        result_data = {'id' : task.id, 'title' : task.title, 'id_todo' : task.id_todo}
        data = {'id' : 1, 'title' : 'исправить баг', 'id_todo' : Todo.objects.get(id=1)}
        self.assertEquals(result_data, data)

    def test_string_representation(self):
        task=Task.objects.get(pk=1)
        self.assertEqual(str(task), task.title)