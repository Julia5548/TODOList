# Generated by Django 3.1.1 on 2020-09-07 09:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_auto_20200826_1216'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='name',
            new_name='title',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='completed',
        ),
    ]