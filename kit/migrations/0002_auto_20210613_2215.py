# Generated by Django 2.2 on 2021-06-14 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kit', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='users',
            field=models.ManyToManyField(related_name='recipes', to='kit.user'),
        ),
    ]