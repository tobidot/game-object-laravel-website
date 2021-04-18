@if ($errors->any())
<x-section class="bg-red-200">
    <div >
        <ul>
            @foreach ($errors->all() as $error)
            <li class="m-1 p-1 border border-red-600 rounded bg-gray-100">{{ $error }}</li>
            @endforeach
        </ul>
    </div>
</x-section>
@endif

@isset($messages)
<x-section class="bg-green-200">
    <div >
        <ul>
            @foreach ($message as $message)
            <li class="m-1 p-1 border border-green-600 rounded bg-gray-100">{{ $message }}</li>
            @endforeach
        </ul>
    </div>
</x-section>
@endisset